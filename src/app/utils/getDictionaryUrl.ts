import Dictionary = mimic.Dictionary;

export default (
  { url, space = '%20' }: Dictionary, phrase: string,
): string => {
  if (!phrase || typeof phrase !== 'string' || phrase === '') {
    return (new URL(url)).origin;
  }

  const formattedPhrase = phrase.replace(/\s/g, space);

  return url.replace('{{phrase}}', formattedPhrase);
};
