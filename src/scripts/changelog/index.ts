import { info } from "@actions/core";
import { getPullRequestData } from "./pullRequest";
import { addChangelogEntry, createChangelogEntry } from "./entry";

export async function run() {
  const pullRequestData = await getPullRequestData();

  if (!pullRequestData || (!pullRequestData.isFix && !pullRequestData.isFeature)) {
    info("Nothing to do. No feature/fix pull request detected.");
    return;
  }

  const changelogEntry = createChangelogEntry(pullRequestData);

  if (changelogEntry) {
    addChangelogEntry(changelogEntry);
  }
}

if (!process.env.TEST) {
  run();
}
