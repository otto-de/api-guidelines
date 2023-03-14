import * as fs from "fs";

type PullRequestMessage = {
  title: string;
  body: string;
};

const CHANGELOG_FILE = "changes/changelog.md";

const CHANGELOG_MARKER = "Changelog:";
const CHANGELOG_ENTRIES_MARKER = "<!--CHANGELOG-MARKER-->";
const CONVENTIONAL_COMMIT_TITLES = {
  FEATURE: "feat",
  FIX: "fix",
  BREAKING: "BREAKING CHANGE",
};

function getEntryBody(message: PullRequestMessage) {
  const textAfterMarker = message.body.split(CHANGELOG_MARKER)[1];
  return textAfterMarker ? textAfterMarker.trim() : "";
}

function isFix(title: string) {
  return title.startsWith(CONVENTIONAL_COMMIT_TITLES.FIX);
}

function isFeature(title: string) {
  return title.startsWith(CONVENTIONAL_COMMIT_TITLES.FEATURE);
}

function isFixOrFeature(message: PullRequestMessage) {
  return isFix(message.title) || isFeature(message.title);
}

function createChangelogEntry(message: PullRequestMessage, date: string) {
  const body = getEntryBody(message);

  return `## ${date}\n${body}`;
}

function prependChangelogEntry(fileContent: string, textToPrepend: string): string {
  const [first, ...rest] = fileContent.split(CHANGELOG_ENTRIES_MARKER);
  if (rest.length === 0) {
    throw `Entries marker '${CHANGELOG_ENTRIES_MARKER}' is missing in CHANGELOG.md file!`;
  }
  // Re add marker to first element (changelog header)
  const firstWithMarker = first + CHANGELOG_ENTRIES_MARKER;
  return [firstWithMarker, textToPrepend, ...rest].join("\n");
}

function addChangelogEntry(textToPrepend: string) {
  const fileContent = fs.readFileSync(CHANGELOG_FILE).toString();
  const newFileContent = prependChangelogEntry(fileContent, textToPrepend);
  fs.writeFileSync(CHANGELOG_FILE, newFileContent);
}

export { isFixOrFeature, createChangelogEntry, addChangelogEntry };
