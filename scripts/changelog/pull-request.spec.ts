import { it, expect, vi, describe, afterEach } from "vitest";
import { getOctokit } from "@actions/github";
import { getPullRequest } from "./pull-request";

const anyCommit = {
  data: {
    commit: {
      author: {
        date: "2023-01-01T21:33:52+01:00",
      },
      message: "any-title\n\nany-body",
    },
    files: [{ filename: "any-file" }],
  },
};
const getCommitMock = vi.fn().mockResolvedValue(anyCommit);
const clientMock = {
  rest: {
    repos: {
      getCommit: getCommitMock,
    },
  },
};
const anyContext = {
  repo: {
    owner: "any-owner",
    repo: "any-repo",
  },
  payload: {
    head_commit: {
      id: "any-id",
    },
  },
};

vi.mock("@actions/github");
vi.mocked(getOctokit).mockReturnValue(clientMock as any);

describe("getPullRequest()", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get the commit object of the current GitHub context", async () => {
    await getPullRequest(anyContext as any);

    expect(getCommitMock).toHaveBeenCalledWith({
      owner: anyContext.repo.owner,
      repo: anyContext.repo.repo,
      ref: anyContext.payload.head_commit.id,
    });
  });

  it("should get the commit object with the passed in reference id (process.env.PR_REF) if available", async () => {
    process.env.PR_REF = "1234";
    await getPullRequest(anyContext as any);

    expect(getCommitMock).toHaveBeenCalledWith({
      owner: anyContext.repo.owner,
      repo: anyContext.repo.repo,
      ref: process.env.PR_REF,
    });
  });

  it("should return a custom pull request object", async () => {
    const result = await getPullRequest(anyContext as any);

    expect(result).toStrictEqual({
      files: ["any-file"],
      message: {
        title: "any-title",
        body: "any-body",
      },
      date: "2023-01-01",
    });
  });
});
