import { context, getOctokit } from "@actions/github";
import { info } from "@actions/core";

export type PullRequestData = {
  title: string;
  body: string;
  date: string;
  files: string[];
  isFix: boolean;
  isFeature: boolean;
  isBreaking: boolean;
};

const CONVENTIONAL_COMMIT_TITLES = {
  FEATURE: "feat",
  FIX: "fix",
};

const token = process.env.GITHUB_TOKEN || "";
const client = getOctokit(token);

export async function getFiles(commitRef: string): Promise<string[]> {
  const { data } = await client.rest.repos.getCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: commitRef,
  });

  return data.files ? data.files.map((file) => file.filename) : [];
}

function isFix(title: string) {
  return title.startsWith(CONVENTIONAL_COMMIT_TITLES.FIX);
}

function isFeature(title: string) {
  return title.startsWith(CONVENTIONAL_COMMIT_TITLES.FEATURE);
}

function isBreaking(title: string) {
  return title.includes("!");
}

export async function getPullRequestData(): Promise<PullRequestData | null> {
  const commitRef = process.env.COMMIT_REF || context.sha;
  const { data } = await client.rest.repos.listPullRequestsAssociatedWithCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    commit_sha: commitRef,
  });

  if (!data[0]) {
    return null;
  }

  const files = await getFiles(commitRef);

  info(`Associated pull request:\n${JSON.stringify(data[0], null, 4)}`);

  const title = data[0].title || "";
  const body = data[0].body || "";
  const date = data[0].merged_at?.split("T")[0] || "";
  const fix = isFix(title);
  const feature = isFeature(title);
  const breaking = isBreaking(title);

  return {
    title,
    body,
    date,
    files,
    isFix: fix,
    isFeature: feature,
    isBreaking: breaking,
  };
}
