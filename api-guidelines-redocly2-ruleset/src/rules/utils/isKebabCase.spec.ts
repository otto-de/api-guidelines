import { isKebabCase } from "./isKebabCase.js";

it("should return true for valid kebab case strings", () => {
  expect(isKebabCase("this-is-kebab-case")).toBe(true);
  expect(isKebabCase("word")).toBe(true);
  expect(isKebabCase("a-b-c")).toBe(true);
});

it("should return false for invalid kebab case strings", () => {
  expect(isKebabCase("ThisIsNotKebabCase")).toBe(false);
  expect(isKebabCase("this_is_not_kebab_case")).toBe(false);
  expect(isKebabCase("this is not kebab case+v1")).toBe(false);
  expect(isKebabCase("this-has_Underscore")).toBe(false);
  expect(isKebabCase("this-has-Capital")).toBe(false);
  expect(isKebabCase("")).toBe(false);
});
