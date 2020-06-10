import { promises } from "fs";
import { readText } from "./fs";

jest.mock("fs", () => {
  return {
    promises: {
      readFile: jest.fn(),
      mkdir: jest.fn(),
      writeFile: jest.fn(),
    },
  };
});

const readFileMock = promises.readFile as Mock<typeof promises.readFile>;

describe("lib/fs", () => {
  describe("readText", () => {
    it("Should read file as text", async () => {
      readFileMock.mockResolvedValue("The Foo Bar");
      await expect(readText("foo/bar.md")).resolves.toEqual("The Foo Bar");
      expect(readFileMock).toHaveBeenCalledTimes(1);
      expect(readFileMock).toHaveBeenCalledWith("foo/bar.md", "utf-8");
    });
  });
});
