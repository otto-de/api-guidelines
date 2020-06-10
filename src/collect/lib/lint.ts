/* eslint-disable @typescript-eslint/no-explicit-any */
import { execaTask, writeLine } from "@otto-ec/toolbox";
import { debug } from "@otto-ec/assets-debug";
import chalk from "chalk";

const log = debug("collect:lint");

export async function lint(): Promise<void> {
  log.debug("Run lint");
  const npmBin = await execaTask({}).execute(
    { execaInput: { cmd: "npm", args: ["bin"] } } as any,
    {}
  );

  const lintCtx = await execaTask({}).execute(
    {
      execaInput: {
        cmd: `${npmBin.execaOutput.stdout}/markdownlint`,
        args: ["--fix", "guidelines/**/*.md"],
        doNotThrow: true,
      },
      execaOutput: undefined as any,
    },
    {}
  );

  log.debug("Output Results for code: ", lintCtx.execaOutput.exitCode);

  if (lintCtx.execaOutput.exitCode !== 0) {
    const matches = [
      ...lintCtx.execaOutput.stderr.matchAll(
        /^(?<file>[\w/.-]+)\s*:(?<line>\d+)\s+(?<msg>.*)$/gm
      ),
    ];

    matches.forEach((m) => {
      if (m.groups) {
        const { file, line, msg } = m.groups;
        if (process.env.CI && process.env.GITHUB_ACTIONS) {
          writeLine(`::error file=${file},line=${line},col=0::${msg}`);
        } else {
          writeLine(file);
          writeLine(`  ${line}:0 ${chalk.redBright("error")} ${msg}`);
        }
      } else {
        writeLine(m[0]);
      }
    });
  }
}
