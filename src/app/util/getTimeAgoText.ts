/**
 * Returns a string representing how long ago the given date was.
 * @param pastDate - The past date to compare with the current time.
 * @returns A string in the format "X hours, Y minutes, Z seconds ago".
 */
export function getTimeAgoText(pastDate: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - pastDate.getTime(); // difference in milliseconds

  // Convert milliseconds to seconds
  const totalSeconds = Math.floor(diffMs / 1000);

  // Calculate hours, minutes, and seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [
    hours > 0 && `${hours} hours`,
    minutes > 0 && `${minutes} minutes`,
    seconds > 0 && `${seconds} seconds`,
  ].filter(Boolean);

  return parts.length > 0 ? `${parts.join(", ")} ago` : "just now";
}
