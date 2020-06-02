import Md from "markdown-it";
import attrs from "markdown-it-attrs";
import container from "markdown-it-container";
import frontMatter from "markdown-it-front-matter";
import highlightjs from "markdown-it-highlightjs";
import { debug } from "@otto-ec/assets-debug";
import type Token from "markdown-it/lib/token";
import type { Config } from "./config";

const log = debug("collect:markdown");

/**
 * Uses container plugin, to render banners from blocks like:
 *
 * ```md
 * ::: tip You Know?
 * this is a tip
 * :::
 * ```
 *
 * @param config
 * @param md
 */
export function registerBlocks(config: Config, md: Md): void {
  Object.entries(config.markdown.blocks).forEach(([name, opts]) => {
    md.use(container, name, {
      render: (tokens: Record<string, Token>, idx: string) => {
        const token = tokens[idx];
        log.trace(idx, token);

        // Opening Tag
        if (token.nesting > 0) {
          const title = token.info.replace(name, "").trim();
          const res = [`<${opts.tag} class="${opts.class}">`];
          if (title.length > 0) {
            res.push(
              `<span class="api-custom-container--title">${title}</span>`
            );
          }
          return res.join("");
        }

        // Closing Tag
        return `</${opts.tag}>`;
      },
    });
  });
}

export function registerAccordion(config: Config, md: Md): void {
  const { marker, attrs: map } = config.markdown.accordion;
  md.use(container, marker, {
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx];
      log.trace(idx, token);

      const res: string[] = [];
      // Opening Tag
      if (token.nesting > 0) {
        const titleAttr = token.attrGet(map.title);
        const title = titleAttr || token.info.replace(marker, "").trim();

        if (typeof token.attrGet(map.begin) === "string") {
          res.push("<ul uk-accordion>");
        }

        res.push("<li");

        const classes = token.attrGet("class");
        const open = typeof token.attrGet(map.open) === "string";
        if (open || classes) {
          res.push(' class="', classes || "", open ? " uk-open" : "", '"');
        }

        res.push('><a class="uk-accordion-title" href="#">', title, "</a>");
        res.push('<div class="uk-accordion-content">');
      } else {
        // Closing Tag
        res.push(`</div></li>`);
        if (typeof token.attrGet(map.end) === "string") {
          res.push("</ul>");
        }
      }

      return res.join("");
    },
  });
}

/**
 * Creates Markdown Parser with needed Plugins
 * @param config
 * @returns parser
 */
export function getParser(config: Config): Md {
  const md = Md({ linkify: true, html: true, typographer: true })
    .use(attrs)
    .use(frontMatter, (fm: string): void => {
      log.trace(fm);
    })
    .use(highlightjs);

  registerBlocks(config, md);
  registerAccordion(config, md);
  return md;
}
