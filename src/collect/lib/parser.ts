import Md from "markdown-it";
import attrs from "markdown-it-attrs";
import container from "markdown-it-container";
import front from "markdown-it-front-matter";
import highlight from "markdown-it-highlightjs";
import { debug } from "@otto-ec/assets-debug";
import type Token from "markdown-it/lib/token";
import { load } from "js-yaml";
import { format } from "util";
import { FrontMatter } from "../types";
import { getConfig } from "./config";
import { ContentError } from "./errors";

const log = debug("collect:parser");

export function getParser(config: ReturnType<typeof getConfig>): Md {
  const md = Md({
    linkify: true,
    html: true,
    typographer: true,
  })
    .use(attrs)
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    .use(front, (fm: string): void => {})
    .use(highlight);

  Object.entries(config.markdown.blocks).forEach(([b, c]) => {
    md.use(container, b, {
      render: (tokens: Record<string, Token>, idx: string) => {
        const token = tokens[idx];
        log.info(idx, token);

        if (token.nesting > 0) {
          const title = token.info.replace(b, "").trim();
          const res = [`<${c.tag} class="${c.class}">`];
          if (title.length > 0) {
            res.push(
              `<span class="api-custom-container--title">${title}</span>`
            );
          }
          return res.join("");
        }
        return `</${c.tag}>`;
      },
    });
  });
  return md;
}

export class Parser {
  static rules = new Map<string, { navTitle: string; source?: string }>();

  frontMatter: FrontMatter = {};

  parser: Md;

  env: unknown = {};

  data: string;

  tokens: Token[];

  output: string;

  headings: {
    id: string;
    level: number;
    text: string;
  }[];

  nav: { text: string };

  level: number;

  source: string | undefined;

  constructor(data: string, level: number, source?: string) {
    this.source = source;
    this.level = level;
    this.data = data;
    this.parser = getParser(getConfig());

    this.tokens = this.parser.parse(this.data, this.env);
    const fm = this.tokens.find((t) => t.type === "front_matter")?.meta;
    this.frontMatter = fm ? load(fm) : {};

    this.headings = this.processHeadings();

    this.nav = {
      ...(this.headings.find((h) => h.level === level + 1) as { text: string }),
    };
    if (this.frontMatter?.navTitle) {
      this.nav.text = this.frontMatter.navTitle;
    }

    this.output = this.parser.renderer.render(
      this.tokens,
      this.parser.options,
      this.env
    );

    this.processRule();

    log.trace(this.tokens);
  }

  public processRule() {
    if (this.frontMatter.id) {
      if (Parser.rules.has(this.frontMatter.id)) {
        throw new ContentError(
          [
            "Duplicate rule id: ",
            this.frontMatter.id,
            " for: ",
            this.nav.text,
            "\nin: ",
            this.source,
            "\nAlready used in:",
            Parser.rules.get(this.frontMatter.id)?.source,
          ].join(" ")
        );
      }

      Parser.rules.set(this.frontMatter.id, {
        ...this.frontMatter,
        navTitle: this.frontMatter.navTitle ?? this.nav.text,
        source: this.source,
      });
    }
  }

  public processHeadings() {
    const res = [];
    for (let i = 0, len = this.tokens.length; i < len; ) {
      const open = this.tokens[i];
      const inline = this.tokens[i + 1];
      const close = this.tokens[i + 2];

      if (
        open.type === "heading_open" &&
        inline.type === "inline" &&
        inline.children?.length &&
        inline.children.length > 0
      ) {
        const { content } = (inline.children as Token[])[0];
        const enhanced = this.enhanceTitle(open, content);
        const id = enhanced.id ?? content.replace(/[\W_]/gi, "-").toLowerCase();

        const anchored = format(
          '<a class="api-headline__anchor" href="#%s">#</a> %s',
          id,
          enhanced.markup
        );

        inline.children = this.parser.parseInline(
          anchored,
          this.env
        )[0].children;

        // TODO: Limit max nesting to H4
        const level = parseInt(open.tag.replace(/h/gi, ""), 10) + this.level;
        open.tag = `h${level}`;
        open.attrSet("id", id);
        open.attrSet("class", "api-headline");
        close.tag = `h${level}`;

        res.push({
          id,
          level,
          orig: content,
          ...enhanced,
        });

        i += 3;
      } else {
        i += 1;
      }
    }

    return res;
  }

  private enhanceTitle(token: Token, content: string) {
    if (token.tag === "h1" && this.frontMatter.type !== undefined) {
      log.debug("enhance title", content);
      const { id: ruleId, type } = this.frontMatter;
      const id =
        ruleId ??
        (() => {
          throw new Error(`Rule "${content}" must contain an id Field`);
        })();

      const markup = format(
        '<span class="api-rule api-rule--%s">%s</span> %s <span class="api-rule__id">%s</span>',
        type.toLowerCase().replace(/\s/g, "-"),
        type,
        content,
        id
      );
      const text = format("%s %s", type, content);

      return {
        markup,
        text,
        id,
      };
    }

    return {
      markup: content,
      text: content,
    };
  }
}
