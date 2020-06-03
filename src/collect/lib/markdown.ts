/* eslint-disable @typescript-eslint/camelcase */
import Md from "markdown-it";
import attrs from "markdown-it-attrs";
import container from "markdown-it-container";
import frontMatter from "markdown-it-front-matter";
import highlightjs from "markdown-it-highlightjs";
import footnote from "markdown-it-footnote";
import { debug } from "@otto-ec/assets-debug";
import type Token from "markdown-it/lib/token";
import { format } from "util";
import type { Config } from "./config";

const log = debug("collect:markdown");

/**
 * Uses container plugin, to render banners from blocks like:
 *
 * ```md
 * ::: info You Know?
 * this is an info
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
  const { identifier, marker, attrs: map } = config.markdown.accordion;
  md.use(container, identifier, {
    marker,
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx];
      log.trace(idx, token);

      const res: string[] = [];
      // Opening Tag
      if (token.nesting > 0) {
        const titleAttr = token.attrGet(map.title);
        const title = titleAttr || token.info.replace(identifier, "").trim();

        if (typeof token.attrGet(map.begin) === "string") {
          res.push('<ul uk-accordion="multiple: true">');
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
 *
 * @param config
 * @param md
 *
 * ```md
 * lorem ipsum `hallo`{ label }
 * lorem ipsum `hallo`{ label=danger }
 * lorem ipsum `hallo`{ label=warning }
 * lorem ipsum `hallo`{ label=success }
 * ```
 */

export function registerLabel(config: Config, md: Md): void {
  const {
    renderer: { rules },
  } = md;
  const { attrs: map, classes } = config.markdown.label;

  const codeInlineOrig = rules.code_inline;

  rules.code_inline = (tokens, idx, options, env, slf) => {
    const token = tokens[idx];
    const type = token.attrGet(map.marker);

    if (typeof type === "string") {
      const res: string[] = [];

      res.push('<span class="', classes.base);
      if (type) {
        res.push(` ${format(classes.style, type)}`);
      }
      res.push('">', token.content, "</span>");
      return res.join("");
    }

    return codeInlineOrig?.(tokens, idx, options, env, slf) || "";
  };
}

export function registerFootnotes(config: Config, md: Md): void {
  const {
    renderer: { rules },
  } = md;
  const { classes } = config.markdown.footnote;

  rules.footnote_ref = (tokens, idx, options, env, slf) => {
    const id = slf.rules.footnote_anchor_name?.(tokens, idx, options, env, slf);
    const caption = slf.rules.footnote_caption?.(
      tokens,
      idx,
      options,
      env,
      slf
    );
    let refid = id;

    if (tokens[idx].meta.subId > 0) {
      refid += `:${tokens[idx].meta.subId}`;
    }

    return `<sup class="${classes.ref}"><a href="#fn${id}" id="fnref${refid}">${caption}</a></sup>`;
  };

  rules.footnote_block_open = () => `<dl class="${classes.list}">`;
  rules.footnote_block_close = () => "</dl>";

  rules.footnote_open = (tokens, idx, options, env, slf) => {
    let id = slf.rules.footnote_anchor_name?.(tokens, idx, options, env, slf);
    const caption = slf.rules.footnote_caption?.(
      tokens,
      idx,
      options,
      env,
      slf
    );
    if (tokens[idx].meta.subId > 0) {
      id += `:${tokens[idx].meta.subId}`;
    }

    return `<dt id="fn${id}"><a href="#fnref${id}" class="${classes.backref}">${caption}</a></dt><dd>`;
  };

  rules.footnote_close = () => "</dd>";
  rules.footnote_anchor = () => "";
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
    .use(highlightjs)
    .use(footnote);

  registerBlocks(config, md);
  registerAccordion(config, md);
  registerLabel(config, md);
  registerFootnotes(config, md);
  return md;
}
