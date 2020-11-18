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

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type Mock<T extends (...args: any) => any> = jest.Mock<
    ReturnType<T>,
    Parameters<T>
  >;
}
