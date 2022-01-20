import type { Parser } from "./lib/parser";
import type { Config } from "./lib/config";

export interface Args {
  render: boolean;
  model: boolean;
}

/**
 * Rule types allowed in Api Guidelines
 */
export enum RuleType {
  MUST = "MUST",
  SHOULD = "SHOULD",
  SHOULD_NOT = "SHOULD NOT",
}

/**
 * Rule review type
 */
export enum RuleReviewType {
  AUTOMATIC = "automatic",
  PARTIAL = "partial",
  MANUAL = "manual",
}

/**
 * Front matter schema used in the api guidelines
 */
export interface FrontMatter {
  id?: string;
  type?: RuleType;
  navTitle?: string;
  sideNav?: boolean;
  reviewType?: RuleReviewType;
  appliesTo?: string | string[];
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
