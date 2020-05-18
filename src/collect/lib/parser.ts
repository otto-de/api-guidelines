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

const log = debug("collect:parser");

export function getParser(
  config: ReturnType<typeof getConfig>,
  frontCb: (frontMatter: string) => void
): Md {
  const md = Md({
    linkify: true,
    html: true,
    typographer: true,
  })
    .use(attrs)

    .use(front, (fm: string) => {
      frontCb(fm);
    })
    .use(highlight);

  Object.entries(config.markdown.blocks).forEach(([b, c]) => {
    md.use(container, b, {
      render: (tokens: Record<string, any>, idx: string) => {
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

  constructor(data: string, level: number) {
    this.level = level;
    this.data = data;
    this.parser = getParser(getConfig(), (fm) => {
      this.frontMatter = load(fm);
    });

    this.tokens = this.parser.parse(this.data, this.env);

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

    log.trace(this.tokens);
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
        const id = content.replace(/[\W_]/gi, "-").toLowerCase();
        const enhanced = this.enhanceTitle(open, content);

        const anchored = format(
          '<a class="api-headline__anchor" href="#%s">&#10521;</a> %s',
          id,
          enhanced.markupWithId
        );

        inline.children = this.parser.parseInline(
          anchored,
          this.env
        )[0].children;

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
      log.debug("enhance title");
      const { id: ruleId, type } = this.frontMatter;
      const id =
        ruleId ??
        (() => {
          throw new Error(`Rule "${content}" must contain an id Field`);
        })();

      const markup = format(
        '<span class="rule-type-%s">%s</span> %s',
        type.toLowerCase().replace(/\s/g, "-"),
        type,
        content
      );
      const text = format("%s %s", type, content);
      const markupWithId = format("%s [%s]", markup, id);
      const textWithId = format("%s [%s]", text, id);

      return {
        markup,
        text,
        markupWithId,
        textWithId,
      };
    }

    return {
      markup: content,
      text: content,
      markupWithId: content,
      textWithId: content,
    };
  }
}
