export enum RuleType {
  MUST = "MUST",
  SHOULD = "SHOULD",
  SHOULD_NOT = "SHOULD NOT",
}

export interface FrontMatter {
  id?: string;
  type?: RuleType;
  navTitle?: string;
}
