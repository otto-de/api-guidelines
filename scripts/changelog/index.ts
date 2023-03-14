import { context } from "@actions/github";
import { Context } from "@actions/github/lib/context";
import { getPullRequest } from "./pull-request";
import { addChangelogEntry, createChangelogEntry, isFixOrFeature } from "./entry";

/**
 * Create changelog entries from feature/fix commits which follow the
 * Conventional Commits specification: https://www.conventionalcommits.org/
 */
export async function run(githubContext: Context) {
  try {
    const pullRequest = await getPullRequest(githubContext);

    if (isFixOrFeature(pullRequest.message)) {
      const changelogEntry = createChangelogEntry(pullRequest.message, pullRequest.date);
      addChangelogEntry(changelogEntry);
    }

    // TODO: Only for testing. Remove after final implementation!
    if (pullRequest.message.title.startsWith("logtest")) {
      const changelogEntry = createChangelogEntry(pullRequest.message, pullRequest.date);
      addChangelogEntry(changelogEntry);
    }
  } catch (error) {
    console.error(error);
  }
}

if (!process.env.TEST) {
  run(context);
}

