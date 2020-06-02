import type { Parser } from "./lib/parser";
import type { Config } from "./lib/config";

/**
 * Rule types allowed in Api Guidelines
 */
export enum RuleType {
  MUST = "MUST",
  SHOULD = "SHOULD",
  SHOULD_NOT = "SHOULD NOT",
}

/**
 * Front matter schema used in the api guidelines
 */
export interface FrontMatter {
  id?: string;
  type?: RuleType;
  navTitle?: string;
  sideNav?: boolean;
}

/**
 * Category Object created by collector
 */
export interface Category {
  name: string;
  index: Parser;
  docs: Parser[];
  children: Category[];
}

export interface ProcessedHeading {
  text: string;
  id: string;
  level: number;
  orig: string;
}

export interface Model {
  config: Config;
  categorys: Category;
  docs: Set<Parser>;
  headings: ProcessedHeading[];
}
