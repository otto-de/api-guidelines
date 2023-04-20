import { expect, it } from "vitest";
import { isUpperSnakeCase } from "./isUpperSnakeCase";

it("returns true for upper snake case strings", () => {
  expect(isUpperSnakeCase("THIS_IS_UPPER_SNAKE_CASE")).toBe(true);
  expect(isUpperSnakeCase("A")).toBe(true);
  expect(isUpperSnakeCase("A1_B2")).toBe(true);
});

it("returns false for non-upper snake case strings", () => {
  expect(isUpperSnakeCase("This_Is_Not_Upper_Snake_Case")).toBe(false);
  expect(isUpperSnakeCase("this_is_not_upper_snake_case")).toBe(false);
  expect(isUpperSnakeCase("This_Is_NOT_Upper_Snake_Case_123")).toBe(false);
  expect(isUpperSnakeCase("this_is_NOT_UPPER_SNAKE_CASE")).toBe(false);
  expect(isUpperSnakeCase("This is not upper snake case")).toBe(false);
  expect(isUpperSnakeCase("")).toBe(false);
});
