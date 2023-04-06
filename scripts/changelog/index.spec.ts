import { it, expect, vi, describe, afterEach } from "vitest";
import { run } from "./index";
import { getPullRequestData } from "./pullRequest";
import { addChangelogEntry, createChangelogEntry } from "./entry";

const anyPullRequestData = {
  title: "fix(any-scope): any description",
  body: "<changelog>any changes text",
  date: "2023-01-01",
  files: ["api/public/ft4/feedback/spec.yml"],
  isFix: true,
  isFeature: false,
  isBreaking: false,
};

const anyChangelogEntry = "any-entry";

vi.mock("@actions/github");

vi.mock("./pullRequest");
vi.mocked(getPullRequestData).mockResolvedValue(anyPullRequestData as any);

vi.mock("./entry");
vi.mocked(createChangelogEntry).mockReturnValue(anyChangelogEntry);
vi.mocked(addChangelogEntry);

vi.mock("./getReleaseType");

describe("run()", async () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should get corresponding pull request data", async () => {
    await run();
    expect(getPullRequestData).toHaveBeenCalledOnce();
  });

  it("should create a changelog entry with the data of the corresponding pull request'", async () => {
    const pullRequestData = { ...anyPullRequestData };
    pullRequestData.isFix = true;
    await run();
    expect(createChangelogEntry).toHaveBeenCalledWith(pullRequestData);
  });

  it("should add the entry to the internal changelog if internal API specs were changed", async () => {
    const pullRequestData = { ...anyPullRequestData };
    pullRequestData.isFix = true;
    await run();
    expect(addChangelogEntry).toHaveBeenCalledWith(anyChangelogEntry);
  });

  it("should do nothing if corresponding pull request is not of type 'fix' or 'feature'", async () => {
    anyPullRequestData.isFix = false;
    anyPullRequestData.isFeature = false;
    await run();
    expect(createChangelogEntry).not.toHaveBeenCalled();
    expect(addChangelogEntry).not.toHaveBeenCalled();
  });
});
