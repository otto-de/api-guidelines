export const isKebabCase = (s: string): boolean => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(s);
