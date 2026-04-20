import { isAbsoluteURI } from "./isAbsoluteURI.js";

it("returns true for absolute URIs", () => {
  expect(isAbsoluteURI("https://www.example.com")).toBe(true);
  expect(isAbsoluteURI("ftp://ftp.example.com/file.txt")).toBe(true);
});

it("returns false for relative URIs", () => {
  expect(isAbsoluteURI("/path/to/resource")).toBe(false);
  expect(isAbsoluteURI("../path/to/resource")).toBe(false);
  expect(isAbsoluteURI("path/to/resource")).toBe(false);
});

it("returns false for invalid URIs", () => {
  expect(isAbsoluteURI("http://example.com:8080:80")).toBe(false);
  expect(isAbsoluteURI("")).toBe(false);
  expect(isAbsoluteURI(null)).toBe(false);
});
