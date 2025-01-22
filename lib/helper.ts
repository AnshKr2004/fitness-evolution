// To format the given ISO 8601 date string (2025-01-22T13:12:00.000Z) into a more readable format, you can use JavaScript's Intl.DateTimeFormat or libraries like date-fns or moment. Here's an example using plain JavaScript:
export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
