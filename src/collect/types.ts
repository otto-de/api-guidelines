import type { Parser } from "./lib/parser";

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
