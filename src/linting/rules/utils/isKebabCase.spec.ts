import { isKebabCase } from "./isKebabCase.js";

describe("isKebabCase", () => {
  it.each([
    "this-is-kebab-case",
    "word",
    "a-b-c",
    "another-123-example",
    "kebab-case-with-numbers-456",
    "my-top10-entities",
  ])(`should return true for "%s"`, (value) => {
    expect(isKebabCase(value)).toBeTruthy();
  });

  it.each([
    "ThisIsNotKebabCase",
    "this_is_not_kebab_case",
    "this is not kebab case+v1",
    "this-has_Underscore",
    "this-has-Capital",
    "123-parameter",
    "camelCase",
    "snake_case",
    "SCREAMING_SNAKE_CASE",
    "",
  ])(`should return false for "%s"`, (value: string) => {
    expect(isKebabCase(value)).toBeFalsy();
  });
});
