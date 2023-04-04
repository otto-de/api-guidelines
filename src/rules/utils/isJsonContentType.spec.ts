import { expect, it } from "vitest";
import { isJsonContentType } from "./isJsonContentType";

it("Returns true for valid JSON content types", () => {
  expect(isJsonContentType("application/hal+json")).toBe(true);
  expect(isJsonContentType("application/json")).toBe(true);
  expect(isJsonContentType("application/problem+json")).toBe(true);
  expect(isJsonContentType("application/vnd.api+json")).toBe(true);
});

it("Returns false for invalid JSON content types", () => {
  expect(isJsonContentType("application/xml")).toBe(false);
  expect(isJsonContentType("text/html")).toBe(false);
  expect(isJsonContentType("application/javascript")).toBe(false);
  expect(isJsonContentType("image/jpeg")).toBe(false);
});

it("Returns false for empty or null input", () => {
  expect(isJsonContentType("")).toBe(false);
  expect(isJsonContentType(null)).toBe(false);
});

it("Returns false for case-sensitive content types", () => {
  expect(isJsonContentType("APPLICATION/JSON")).toBe(true);
  expect(isJsonContentType("Application/Json")).toBe(true);
});
