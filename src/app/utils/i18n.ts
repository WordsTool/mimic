export default function i18n(message: string) {
  return chrome.i18n.getMessage(message).replace(/<br\/>/g, '\n');
}
