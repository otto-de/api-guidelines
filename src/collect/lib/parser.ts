import { debug } from "@otto-ec/assets-debug";
import type Token from "markdown-it/lib/token";
import { load } from "js-yaml";
import { format } from "util";
import type MarkdownIt from "markdown-it";
import { ContentError } from "./errors";
import type { FrontMatter } from "../types";

const log = debug("collect:parser");

interface ProcessedHeading {
  text: string;
  id: string;
  level: number;
  orig: string;
}

/**
 * Encapsulates processing of a single markdown document, by
 * parsing it, and acting as data container for the document data
 */
export class Parser {
  /** Every document declared as rule will be added here */
  static rules = new Map<
    string,
    Required<FrontMatter> & { navTitle: string; source?: string }
  >();

  /** Front Matter extracted from docuement */
  frontMatter: FrontMatter = {};

  /** Markdown Parser used to process markdown data */
  parser: MarkdownIt;

  /** used by markdown parser internally */
  env: unknown = {};

  /** Source data as raw Markdown */
  data: string;

  /** Parsed Tokens */
  tokens: Token[];

  /** Rendered HTML output */
  output: string;

  /** Heading found in the Document */
  headings: ProcessedHeading[];

  /** First Heading of the document, can be used to build nav */
  nav: ProcessedHeading;

  /**
   * Level of the document in the file structure
   */
  level: number;

  /**
   * Source file of the markdown data
   */
  source?: string;

  constructor(
    parser: MarkdownIt,
    data: string,
    level: number,
    source?: string
  ) {
    this.source = source;
    this.level = level;
    this.data = data;
    this.parser = parser;

    this.tokens = this.parser.parse(this.data, this.env);
    this.frontMatter = this.processFrontMatter();
    this.headings = this.processHeadings();
    this.nav = this.processNavData();
    this.output = this.renderTokens();
    this.checkAndProcessRule();
  }

  /**
   * Renders processed tokens into HTML
   * @returns Rendered html as string
   */
  public renderTokens(): string {
    return this.parser.renderer.render(
      this.tokens,
      this.parser.options,
      this.env
    );
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

      // Add rule to the collection of rules
      Parser.rules.set(this.frontMatter.id, {
        ...this.frontMatter,
        navTitle: this.frontMatter.navTitle ?? this.nav.text,
        source: this.source,
      });
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
          this.env
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
