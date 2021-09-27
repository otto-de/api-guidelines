/* eslint-disable @typescript-eslint/no-explicit-any */
import { debug } from "@otto-ec/assets-debug";
import { Arguments } from "yargs";
import { colors, stdout } from "@otto-ec/assets-core-utils/stdio";
import { execaValueTask } from "@otto-ec/toolbox";
import { Args } from "../types";

const log = debug("collect:lint");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function lint(argv: Arguments<Args>): Promise<void> {
  log.debug("Run lint");
  const npmBin = await execaValueTask({}).execute(
    { execaInput: { cmd: "npm", args: ["bin"] } } as any,
    {} as any
  );

  const lintCtx = await execaValueTask({}).execute(
    {
      execaInput: {
        cmd: `${npmBin.execaOutput.stdout}/markdownlint`,
        args: ["--fix", "guidelines/**/*.md"],
        doNotThrow: true,
      },
      execaOutput: undefined as any,
    },
    {} as any
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
          stdout(`::error file=${file},line=${line},col=0::${msg}`);
        } else {
          stdout(file);
          stdout(`  ${line}:0 ${colors.redBright("error")} ${msg}`);
        }
      } else {
        stdout(m[0]);
      }
    });
  }
}
