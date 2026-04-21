export function isAbsoluteURI(uri) {
  try {
    const url = new URL(uri);
    return url.protocol !== "" && url.host !== "";
  } catch (e) {
    return false;
  }
}
