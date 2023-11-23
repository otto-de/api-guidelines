import * as fs from "fs";
import { info } from "@actions/core";
import type { PullRequestData } from "./pullRequest.js";

const CHANGELOG_FILE = "changes/changelog.md";
const CHANGELOG_MARKER = "Changelog:";
const CHANGELOG_ENTRIES_MARKER = "<!--CHANGELOG-MARKER-->";

function getEntryText(body: string) {
  const textAfterMarker = body.split(CHANGELOG_MARKER)[1];
  return textAfterMarker ? textAfterMarker.trim() : "";
}

function createChangelogEntry(pullRequestData: PullRequestData) {
  const entryText = getEntryText(pullRequestData.body);

  return entryText ? `## ${pullRequestData.date}\n${entryText}` : "";
}

function prependChangelogEntry(fileContent: string, textToPrepend: string): string {
  const [first, ...rest] = fileContent.split(CHANGELOG_ENTRIES_MARKER);
  if (rest.length === 0) {
    throw new Error(
      `Entries marker '${CHANGELOG_ENTRIES_MARKER}' is missing in CHANGELOG.md file!`,
    );
  }
  // Re add marker to first element (changelog header)
  const firstWithMarker = first + CHANGELOG_ENTRIES_MARKER;
  return [firstWithMarker, textToPrepend, ...rest].join("\n");
}

function addChangelogEntry(textToPrepend: string) {
  const fileContent = fs.readFileSync(CHANGELOG_FILE, { encoding: "utf-8" });
  const newFileContent = prependChangelogEntry(fileContent, textToPrepend);
  fs.writeFileSync(CHANGELOG_FILE, newFileContent);
  info(`Changelog entry: ${textToPrepend}`);
}

export { createChangelogEntry, addChangelogEntry };
