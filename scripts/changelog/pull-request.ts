import { Context } from "@actions/github/lib/context";
import { getOctokit } from "@actions/github";

function getFiles(commit) {
  return commit.files.map((entry) => entry.filename);
}

function getMessage(commit) {
  const messageArray = commit.commit.message.split("\n\n");
  return {
    title: messageArray.shift(),
    body: messageArray.join(""),
  };
}

function getDate(commit) {
  return commit.commit.author.date.split("T")[0];
}

async function getCommit(context) {
  const client = getOctokit(process.env.GITHUB_TOKEN);

  const { data } = await client.rest.repos.getCommit({
    owner: context.repo.owner,
    repo: context.repo.repo,
    ref: process.env.PR_REF || context.payload.head_commit.id,
  });

  return data;
}

export async function getPullRequest(context: Context) {
  const commit = await getCommit(context);

  return {
    files: getFiles(commit),
    message: getMessage(commit),
    date: getDate(commit),
  };
}
