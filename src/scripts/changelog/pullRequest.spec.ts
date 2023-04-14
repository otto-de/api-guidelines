import { it, expect, vi, describe, afterEach } from "vitest";
import { getPullRequestData } from "./pullRequest";

const anyPullRequest = {
  data: [
    {
      title: "any-title",
      body: "any-body",
      merged_at: "2023-03-01T15:33:40Z",
    },
  ],
};

vi.mock("@actions/github", () => ({
  // Mock workflow context object
  context: {
    repo: {
      owner: "any-owner",
      repo: "any-repo",
    },
    sha: "any-sha",
  },
  // Mock Octokit client
  getOctokit: vi.fn().mockReturnValue({
    rest: {
      repos: {
        listPullRequestsAssociatedWithCommit: () => {
          return anyPullRequest;
        },
        getCommit: vi.fn().mockResolvedValue({
          data: {
            files: [
              {
                filename: "any-file.yml",
              },
            ],
          },
        }),
      },
    },
  }),
}));

describe("getPullRequestData()", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return the relevant pull request data", async () => {
    const result = await getPullRequestData();

    expect(result).toStrictEqual({
      title: "any-title",
      body: "any-body",
      date: "2023-03-01",
      files: ["any-file.yml"],
      isFix: false,
      isFeature: false,
      isBreaking: false,
    });
  });

  it("should set property 'isFix' to true if pull request title contains 'fix'", async () => {
    anyPullRequest.data[0].title = "fix(any-scope): any description";

    const result = await getPullRequestData();

    expect(result).toStrictEqual({
      title: "fix(any-scope): any description",
      body: "any-body",
      date: "2023-03-01",
      files: ["any-file.yml"],
      isFix: true,
      isFeature: false,
      isBreaking: false,
    });
  });

  it("should set property 'isFeature' to true if pull request title contains 'feat'", async () => {
    anyPullRequest.data[0].title = "feat(any-scope): any description";

    const result = await getPullRequestData();

    expect(result).toStrictEqual({
      title: "feat(any-scope): any description",
      body: "any-body",
      date: "2023-03-01",
      files: ["any-file.yml"],
      isFix: false,
      isFeature: true,
      isBreaking: false,
    });
  });

  it("should set property 'isFeature' to true if pull request title contains 'feature'", async () => {
    anyPullRequest.data[0].title = "feature(any-scope): any description";

    const result = await getPullRequestData();

    expect(result).toStrictEqual({
      title: "feature(any-scope): any description",
      body: "any-body",
      date: "2023-03-01",
      files: ["any-file.yml"],
      isFix: false,
      isFeature: true,
      isBreaking: false,
    });
  });

  it("should set property 'isBreaking' to true if pull request title contains 'feature'", async () => {
    anyPullRequest.data[0].title = "feature(any-scope)!: any description";

    const result = await getPullRequestData();

    expect(result).toStrictEqual({
      title: "feature(any-scope)!: any description",
      body: "any-body",
      date: "2023-03-01",
      files: ["any-file.yml"],
      isFix: false,
      isFeature: true,
      isBreaking: true,
    });
  });
});
