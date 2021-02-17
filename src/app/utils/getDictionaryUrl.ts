export default (
  url: string, phrase: string,
): string => url.replace('{{phrase}}', phrase);
