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

const log = debug("collect:parser");

export function getParser(frontCb: (frontMatter: string) => void): Md {
  const md = Md({
    linkify: true,
    html: true,
    typographer: true,
  })
    .use(attrs)
    .use(container, "tip", {
      render: (tokens: Record<string, any>, idx: string) => {
        const token = tokens[idx];
        log.trace(idx, token);
        if (token.nesting > 0) {
          return '<div class="foo--bar-----tooltip">';
        }
        return "</div>";
      },
    })
    .use(front, (fm: string) => {
      frontCb(fm);
    })
    .use(highlight);
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
    level: number;
    content: string;
  }[];

  navTitle?: string;

  level: number;

  constructor(data: string, level: number) {
    this.level = level;
    this.data = data;
    this.parser = getParser((fm) => {
      this.frontMatter = load(fm);
    });

    this.tokens = this.parser.parse(this.data, this.env);

    this.headings = this.processHeadings();

    this.navTitle =
      this.frontMatter?.navTitle ||
      this.headings.find((h) => h.level === level + 1)?.content;

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
        const id = this.frontMatter?.id
          ? this.frontMatter.id
          : content.replace(/[\W_]/gi, "-").toLowerCase();

        const enhanced = this.enhanceTitle(open, content, id);
        inline.children = this.parser.parseInline(
          enhanced,
          this.env
        )[0].children;

        const level = parseInt(open.tag.replace(/h/gi, ""), 10) + this.level;
        open.tag = `h${level}`;
        open.attrSet("id", id);
        close.tag = `h${level}`;

        res.push({
          level,
          content: inline.children
            ?.filter((c) => c.type === "text")
            .map((c) => c.content)
            .join(""),
        });

        i += 3;
      } else {
        i += 1;
      }
    }

    return res;
  }

  private enhanceTitle(token: Token, content: string, id: string): string {
    let res: string = content;
    if (token.tag === "h1" && this.frontMatter.type !== undefined) {
      log.debug("enhance title");

      res = format(
        '<span class="rule-type-%s">%s</span>: %s [%s]',
        this.frontMatter.type.toLowerCase(),
        this.frontMatter.type,
        content,
        id
      );

      // eslint-disable-next-line no-param-reassign
      //
    }

    return format('<a class="header-anchor" href="#%s">%s</a>', id, res);
  }
}
