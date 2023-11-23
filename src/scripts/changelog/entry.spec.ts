import { readFileSync, writeFileSync } from "fs";
import { addChangelogEntry, createChangelogEntry } from "./entry.js";

vi.mock("node:fs");

const anyPullRequestData = {
  title: "fix(any-scope): any description",
  body: "Changelog: any changes text",
  date: "2023-01-01",
  files: [],
  isFix: true,
  isFeature: false,
  isBreaking: false,
};

describe("createChangelogEntry()", async () => {
  it(`should return a formatted changelog entry string`, () => {
    const expected = "## 2023-01-01\nany changes text";
    const result = createChangelogEntry(anyPullRequestData);
    expect(result).toBe(expected);
  });

  it(`should only use the text after the changelog marker for creating the entry`, () => {
    anyPullRequestData.body = "Some leading text Changelog: any changes text";
    const expected = "## 2023-01-01\nany changes text";
    const result = createChangelogEntry(anyPullRequestData);
    expect(result).toBe(expected);
  });

  it(`should create an empty changelog entry if the marker is missing in the pull request body`, () => {
    anyPullRequestData.body = "any changes text";
    const result = createChangelogEntry(anyPullRequestData);
    expect(result).toBe("");
  });
});

describe("addChangelogEntry()", async () => {
  it("should read the content of the given changelog file", () => {
    const changelogMarker = "<!--CHANGELOG-MARKER-->";
    const anyFileContent = "any-content";

    vi.mocked(readFileSync).mockReturnValue(changelogMarker + anyFileContent);

    addChangelogEntry("any-text");
    expect(readFileSync).toHaveBeenCalledWith("changes/changelog.md", { encoding: "utf-8" });
  });

  it("should write the changelog content with the prepended new entry text back to file", () => {
    const changelogHeader = "Any Header";
    const changelogMarker = "<!--CHANGELOG-MARKER-->";
    const existingEntries = "any-entries";
    const newEntry = "new-entry";
    const mockChangelog = `${changelogHeader}${changelogMarker}${existingEntries}`;
    const expectedUpdatedChangelog = `${changelogHeader}${changelogMarker}\n${newEntry}\n${existingEntries}`;

    vi.mocked(readFileSync).mockReturnValue(mockChangelog);

    addChangelogEntry(newEntry);
    expect(writeFileSync).toHaveBeenCalledWith("changes/changelog.md", expectedUpdatedChangelog);
  });
});
