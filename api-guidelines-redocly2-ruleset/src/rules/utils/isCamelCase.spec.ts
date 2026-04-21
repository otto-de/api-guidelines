import { isCamelCase } from "./isCamelCase.js";

it("should fooBar should be valid", () => {
  expect(isCamelCase("fooBar")).toBeTruthy();
});

it("should foo should be valid", () => {
  expect(isCamelCase("foo")).toBeTruthy();
});

it("should foo-bar should be valid", () => {
  expect(isCamelCase("foo-bar")).toBeFalsy();
});

it("should foo_bar should be valid", () => {
  expect(isCamelCase("foo_bar")).toBeFalsy();
});
