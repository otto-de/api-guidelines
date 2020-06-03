import { debug } from "@otto-ec/assets-debug";
import type Token from "markdown-it/lib/token";
import { load } from "js-yaml";
import { format } from "util";
import type MarkdownIt from "markdown-it";
import { dirname, normalize, join } from "path";
import { ContentError } from "./errors";
import type { FrontMatter, ProcessedHeading } from "../types";
import { Config } from "./config";

const log = debug("collect:parser");

const localPathRegex = /(?<path>\S+[\w-]+\.md)(?<hash>#\S+)?/;

/**
 * Encapsulates processing of a single markdown document, by
 * parsing it, and acting as data container for the document data
 */
export class Parser {
  /** Every document declared as rule will be added here */
  static ruleMap = new Map<string, Parser>();

  /** Every instance of Parser mapped by the source path */
  static sourceMap = new Map<string, Parser>();

  /** Contains bad links found in the data */
  static badLinks = new Set<{
    href: string;
    source: string;
    map?: [number, number] | null;
  }>();

  /** Flattened Data Collection */
  static docs = new Set<Parser>();

  /** Front Matter extracted from docuement */
  frontMatter: FrontMatter = {};

  /** Markdown Parser used to process markdown data */
  parser: MarkdownIt;

  /** used by markdown parser internally */
  env: Record<string, any> = {};

  /** Source data as raw Markdown */
  data: string;

  /** Parsed Tokens */
  tokens: Token[];

  /** Rendered HTML output */
  output?: string;

  /** Heading found in the Document */
  headings: ProcessedHeading[];

  /** First Heading of the document, can be used to build nav */
  nav: ProcessedHeading;

  /** Level of the document in the file structure */
  level: number;

  /** Source file of the markdown data */
  source: string;

  /** Collector Config  object  */
  config: Config;

  constructor(
    parser: MarkdownIt,
    config: Config,
    data: string,
    level: number,
    source: string
  ) {
    this.source = source;
    this.level = level;
    this.data = data;
    this.parser = parser;
    this.config = config;

    this.tokens = this.parser.parse(this.data, this.env);
    this.frontMatter = this.processFrontMatter();
    this.preprocessTokens(this.tokens);
    this.headings = this.processHeadings();
    this.nav = this.processNavData();
    this.env.docId = this.nav.id;
    this.checkAndProcessRule();
    this.processSourceMap();

    Parser.docs.add(this);
  }

  public render(): void {
    const { parser, tokens, env } = this;
    this.processTokens(tokens);
    this.output = parser.renderer.render(tokens, parser.options, env);
  }

  public processTokens(tokens: Token[], parent?: Token): void {
    tokens.forEach((t) => {
      if (t.type === "link_open") {
        // log.debug("Link Found: ", t.attrGet("href"));
        this.remapLink(t, parent);
      }

      if (t.children) {
        this.processTokens(t.children, t);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public preprocessTokens(tokens: Token[]): void {
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];

      if (token.block && token.nesting === 1 && token.attrs) {
        for (let p = i; p < tokens.length; p += 1) {
          const t = tokens[p];
          if (t.block && t.tag === token.tag && t.nesting === -1) {
            t.attrs = token.attrs;
          }
        }
      }

      if (
        this.source.match("guidelines/index.md") &&
        token.type.match("footnote")
      ) {
        log.debug(token);
      }

      if (token.children) {
        this.preprocessTokens(token.children);
      }
    }
  }

  public remapLink(token: Token, parent?: Token): void {
    const href = token.attrGet("href") as string;
    log.trace("Processing href: %o", href);
    const matches = localPathRegex.exec(href);
    log.trace("Regex Result:", matches);

    if (matches?.groups?.hash) {
      log.trace("Found hash: ", matches.groups.hash);
      token.attrSet("href", matches.groups.hash);
    } else if (matches?.groups?.path) {
      let path = normalize(matches.groups.path);
      const root = normalize(this.config.root);

      if (path.startsWith(root)) {
        log.trace("Path is relative to root: ", path);
      } else {
        log.trace("Path is relative to source", path);

        const sourceDir = dirname(this.source);
        path = normalize(join(sourceDir, path));
      }
      log.trace("Found Path:", path);

      const target = [...Parser.sourceMap.keys()].find(
        (k) => k.indexOf(path) > -1
      );
      log.trace("Found Target", target);

      if (target) {
        const { nav } = Parser.sourceMap.get(target) as Parser;
        log.debug("Remapped Link from: %s to: %s", href, nav.id);
        token.attrSet("href", `#${nav.id}`);
      } else {
        const map = token.map || parent?.map;
        // eslint-disable-next-line no-script-url
        token.attrSet("href", "javascript:void(0);");
        token.attrSet("class", "api-docs-broken-link");
        token.attrSet(
          "onClick",
          [
            "alert('This Link is Brocken!",
            `href: ${href}`,
            `Source${this.source}`,
            "')",
          ].join("\\n")
        );

        log.warn("Bad Link: %s in: %s at: %o", href, this.source, map);
        Parser.badLinks.add({ href, source: this.source, map });
      }
    }
  }

  /**
   * creates nav object from headings and frontmatter
   * @returns nav data
   */
  public processNavData(): ProcessedHeading {
    const nav = {
      ...(this.headings.find(
        (h): h is ProcessedHeading => h.level === this.level + 1
      ) as ProcessedHeading),
    };
    if (this.frontMatter?.navTitle) {
      nav.text = this.frontMatter.navTitle;
    }

    return nav;
  }

  public processSourceMap(): void {
    if (Parser.sourceMap.has(this.source)) {
      throw new Error(`Source File already exists in map: ${this.source}`);
    }
    Parser.sourceMap.set(this.source, this);
  }

  /**
   * Process front matter by searching frontmatter data in the token list
   * @returns front matter
   */
  public processFrontMatter(): FrontMatter {
    const fm = this.tokens.find((t) => t.type === "front_matter")?.meta;
    return fm ? load(fm) : {};
  }

  /**
   * Ensures the rule id is not duplicate, and adds it to the rule collection
   */
  public checkAndProcessRule(): void {
    if (Parser.isRule(this.frontMatter)) {
      // Check for rule id duplicates
      if (Parser.ruleMap.has(this.frontMatter.id)) {
        throw new ContentError(
          [
            "Duplicate rule id: ",
            this.frontMatter.id,
            " for: ",
            this.nav.text,
            "\nin: ",
            this.source,
            "\nAlready used in:",
            Parser.ruleMap.get(this.frontMatter.id)?.source,
          ].join(" ")
        );
      }

      // Add rule to the collection of rules
      Parser.ruleMap.set(this.frontMatter.id, this);
    }
  }

  /**
   * Determines whether processed document is a Guiedeline Rule
   * For this the docuement frontmatter must have metadata in the front matter
   *
   * as yaml in from like
   *
   * ```yaml
   * id: R000333
   * type: SCHOULD
   * ```
   *
   * @param fm
   * @returns true if docuement is rule
   */
  static isRule(fm: FrontMatter): fm is Required<FrontMatter> {
    return !!fm.id && !!fm.type;
  }

  /**
   * Process headings by enriching them with anchors and ids
   * @returns headings
   */
  public processHeadings(): ProcessedHeading[] {
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
        const { content } = inline;

        // Enhance h1 rule heading if file is a rule
        const {
          markup,
          text,
          // use frontmatter id or heading text otherwise
          id = content.replace(/[\W_]/gi, "-").toLowerCase(),
        } = this.enhanceTitle(open, content);

        // Replace heading children with an anchored data
        const aFormat = '<a class="api-headline__anchor" href="#%s">#</a> %s';
        inline.children = this.parser.parseInline(
          format(aFormat, id, markup),
          {}
        )[0].children;

        // TODO: Limit max nesting to H4
        // Calculate new heading level
        const level = parseInt(open.tag.replace(/h/gi, ""), 10) + this.level;
        open.tag = `h${level}`;
        open.attrSet("id", id);
        open.attrSet("class", "api-headline");
        close.tag = `h${level}`;

        res.push({ text, level, orig: content, id });
        i += 3;
      } else {
        i += 1;
      }
    }

    return res;
  }

  /**
   * Enhances title for rule documetns
   * @param token
   * @param content
   * @returns title
   */
  private enhanceTitle(
    token: Token,
    content: string
  ): { markup: string; text: string; id?: string } {
    // Process h1 of rule files
    if (token.tag === "h1" && Parser.isRule(this.frontMatter)) {
      log.trace("Enhance rule title", content);
      const { id, type } = this.frontMatter;

      const markup = format(
        '<span class="api-rule api-rule--%s">%s</span> %s <span class="api-rule__id">%s</span>',
        type.toLowerCase().replace(/\s/g, "-"),
        type,
        content,
        id
      );
      const text = format("%s %s", type, content);

      return { markup, text, id };
    }

    // just pass throught data
    return { markup: content, text: content, id: this.frontMatter.id };
  }
}
