import { expect, it } from "vitest";
import { isValidDateTimeFormat } from "./isValidDateTimeFormat";

it("Valid ISO 8601 date-time format with Z", () => {
  const input = "2023-03-28T15:30:45.123Z";
  expect(isValidDateTimeFormat(input)).toBe(true);
});

it("Valid ISO 8601 date-time format with timezone offset", () => {
  const input = "2023-03-28T15:30:45.123+02:00";
  expect(isValidDateTimeFormat(input)).toBe(true);
});

it("Invalid date-time format without milliseconds", () => {
  const input = "2023-03-28T15:30:45";
  expect(isValidDateTimeFormat(input)).toBe(false);
});

it("Invalid date-time format without T separator", () => {
  const input = "2023-03-28 15:30:45.123Z";
  expect(isValidDateTimeFormat(input)).toBe(false);
});

it("Invalid date format", () => {
  const input = "2023-03-28";
  expect(isValidDateTimeFormat(input)).toBe(false);
});

it("Invalid time format", () => {
  const input = "15:30:45.123Z";
  expect(isValidDateTimeFormat(input)).toBe(false);
});

it("Invalid string", () => {
  const input = "invalid_string";
  expect(isValidDateTimeFormat(input)).toBe(false);
});
