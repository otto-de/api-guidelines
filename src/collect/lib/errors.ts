export class ContentError extends Error {
  file: string | undefined;

  line: string | undefined;

  col: string | undefined;

  constructor(
    message: string,
    file?: string,
    line?: string | number,
    col?: string | number
  ) {
    super(message);

    this.file = file;
    this.line = line?.toString();
    this.col = col?.toString();
  }
}
