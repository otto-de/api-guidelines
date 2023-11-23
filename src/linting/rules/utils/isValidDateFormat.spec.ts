import { isValidDateFormat } from "./isValidDateFormat.js";

it("returns true for valid dates in YYYY-MM-DD format", () => {
  expect(isValidDateFormat("2023-03-28")).toBe(true);
  expect(isValidDateFormat("2000-02-29")).toBe(true);
  expect(isValidDateFormat("1900-01-01")).toBe(true);
});

it("returns false for invalid dates", () => {
  expect(isValidDateFormat("2023-02-30")).toBe(false);
  expect(isValidDateFormat("2023-13-01")).toBe(false);
  expect(isValidDateFormat("2000-02-30")).toBe(false);
  expect(isValidDateFormat("1900-02-29")).toBe(false);
});

it("returns false for dates in incorrect format", () => {
  expect(isValidDateFormat("2023/03/28")).toBe(false);
  expect(isValidDateFormat("28-03-2023")).toBe(false);
  expect(isValidDateFormat("2023.03.28")).toBe(false);
  expect(isValidDateFormat("03-28-2023")).toBe(false);
});

it("returns false for non-date strings", () => {
  expect(isValidDateFormat("hello")).toBe(false);
  expect(isValidDateFormat("")).toBe(false);
  expect(isValidDateFormat("12345678")).toBe(false);
  expect(isValidDateFormat("abcdefgh")).toBe(false);
});
