import { info } from "@actions/core";
import { getPullRequestData } from "./pullRequest";
import { addChangelogEntry, createChangelogEntry } from "./entry";

export async function run() {
  const pullRequestData = await getPullRequestData();

  if (!pullRequestData.isFix && !pullRequestData.isFeature) {
    // Return early if no major/minor/patching changes.
    info("Nothing to do. No feature/fix commit detected.");
    return;
  }

  const changelogEntry = createChangelogEntry(pullRequestData);
  addChangelogEntry(changelogEntry);
}

if (!process.env.TEST) {
  run();
}
