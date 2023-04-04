/**
 * Regular expression to match JSON content types
 */
export const isJsonContentType = (contentType: string): boolean =>
  /^(application\/(?:.+?\+)?json)/i.test(contentType);
