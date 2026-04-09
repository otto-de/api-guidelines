export function isValidDateFormat(dateString: string): boolean {
  // The regular expression pattern for the date format 'YYYY-MM-DD'
  const dateFormatPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

  // Test the date string against the pattern
  if (dateFormatPattern.test(dateString)) {
    // If the pattern matches, check if the date is valid (e.g., not February 30)
    const date = new Date(dateString);
    const dateComponents = dateString.split("-").map(Number);
    return (
      dateComponents[0] === date.getFullYear() &&
      dateComponents[1] - 1 === date.getMonth() &&
      dateComponents[2] === date.getDate()
    );
  }

  // If the pattern doesn't match, return false
  return false;
}
