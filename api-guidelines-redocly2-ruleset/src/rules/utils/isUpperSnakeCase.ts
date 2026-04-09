export const isUpperSnakeCase = (inputString: string): boolean =>
  /^[A-Z0-9]+(?:_[A-Z0-9]+)*$/.test(inputString);
