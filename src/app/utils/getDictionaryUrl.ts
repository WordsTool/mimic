export default (
  url: string, phrase: string,
): string => {
  if (phrase && typeof phrase === 'string' && phrase !== '') {
    return url.replace('{{phrase}}', phrase);
  }

  return (new URL(url)).origin;
};
