import { isCamelCase } from "./isCamelCase.js";

describe("isCamelCase", () => {
  it.each([
    "thisIsCamelCase",
    "anotherExample123",
    "myGreat0To10Foo",
    "variable",
    "myTop10Entities",
    "affine3D",
  ])(`should return true for "%s"`, (value) => {
    expect(isCamelCase(value)).toBeTruthy();
  });

  it.each([
    "kebab-case",
    "10AwesomeThings",
    "snake_case",
    "SCREAMING_SNAKE_CASE",
    "WRonGCAmelCase",
    "SCREAMING-KEBAB-CASE",
  ])(`should return false for "%s"`, (value) => {
    expect(isCamelCase(value)).toBeFalsy();
  });
});
