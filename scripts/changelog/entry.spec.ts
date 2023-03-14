import { it, expect, describe, vi } from "vitest";
import { readFileSync, writeFileSync } from "fs";
import { addChangelogEntry, createChangelogEntry, isFixOrFeature } from "./entry";

const CHANGELOG_FILE = "changes/changelog.md";
const changelogMarker = "<!--CHANGELOG-MARKER-->";
const anyFileContent = "any-content";

vi.mock("node:fs");
vi.mocked(readFileSync).mockReturnValue(changelogMarker + anyFileContent);

describe("isFixOrFeature()", async () => {
  it(`should return true if message.title contains 'fix'`, () => {
    const result = isFixOrFeature({ title: "fix(scope): description", body: "any-body" });
    expect(result).toBe(true);
  });

  it(`should return true if message.title contains 'feat'`, () => {
    const result = isFixOrFeature({ title: "fix(scope): description", body: "any-body" });
    expect(result).toBe(true);
  });

  it(`should return true if message.title contains 'feature'`, () => {
    const result = isFixOrFeature({ title: "fix(scope): description", body: "any-body" });
    expect(result).toBe(true);
  });

  it(`should return false if message.title does NOT contain 'fix' or 'feat'`, () => {
    const result = isFixOrFeature({ title: "any(scope): description", body: "any-body" });
    expect(result).toBe(false);
  });
});

describe("createChangelogEntry()", async () => {
  const anyDate = "2023-01-01";
  it(`should return a formatted string with all required data`, () => {
    const anyMessage = {
      title: "fix(any-scope): any commit subject",
      body: "Changelog:\nany commit body",
    };
    const expected = "## 2023-01-01\nany commit body";
    const result = createChangelogEntry(anyMessage, anyDate);
    expect(result).toBe(expected);
  });
});

describe("addChangelogEntry()", async () => {
  it("should read the content of the given changelog file", () => {
    addChangelogEntry("any-text");
    expect(readFileSync).toHaveBeenCalledWith(CHANGELOG_FILE);
  });

  it("should write the changelog content with the prepended new entry text back to file", () => {
    const newEntry = "new-entry";
    addChangelogEntry(newEntry);
    expect(writeFileSync).toHaveBeenCalledWith(
      CHANGELOG_FILE,
      `${changelogMarker}\n${newEntry}\n${anyFileContent}`
    );
  });
});
