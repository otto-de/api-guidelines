import { it, expect, vi, describe, afterEach } from "vitest";
import { run } from "./index";
import { getPullRequest } from "./pull-request";
import { addChangelogEntry, createChangelogEntry, isFixOrFeature } from "./entry";

const anyGithubContext = <any>"any-context";

const anyPullRequestObject = {
  files: ["api/internal/any-internal.yml"],
  message: {
    title: "fix(any-scope): any commit subject",
    body: "any commit body",
  },
  date: "2023-01-01T21:33:52+01:00",
};

const anyChangelogEntry = "any-entry";

vi.mock("./pull-request");
vi.mocked(getPullRequest).mockResolvedValue(anyPullRequestObject as any);

vi.mock("./entry");
vi.mocked(isFixOrFeature).mockReturnValue(false);
vi.mocked(createChangelogEntry).mockReturnValue(anyChangelogEntry);
vi.mocked(addChangelogEntry);

describe("run()", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get the commit object of the current GitHub context", async () => {
    await run(anyGithubContext);
    expect(getPullRequest).toHaveBeenCalledWith(anyGithubContext);
  });

  it("should create an changelog entry if commit is of type 'fix' or 'feature", async () => {
    vi.mocked(isFixOrFeature).mockReturnValue(true);
    await run(anyGithubContext);
    expect(createChangelogEntry).toHaveBeenCalledWith(
      anyPullRequestObject.message,
      anyPullRequestObject.date
    );
  });

  it("should NOT create an changelog entry if commit is NOT of type 'fix' or 'feature", async () => {
    vi.mocked(isFixOrFeature).mockReturnValue(false);
    await run(anyGithubContext);
    expect(createChangelogEntry).not.toHaveBeenCalled();
  });

  it("should add entry to the changelog", async () => {
    vi.mocked(isFixOrFeature).mockReturnValue(true);
    await run(anyGithubContext);
    expect(addChangelogEntry).toHaveBeenCalledWith(anyChangelogEntry);
  });
});
