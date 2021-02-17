import dictionaries from './dictionaries';

const extensionId = chrome.runtime.id;

const defaultTabConfig = {
  pinned: false,
  phrase: '',
};

const tabs: {
  [key: number]: {
    pinned: boolean,
    phrase: string,
  },
} = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  console.log({ message });
  if (sender.id !== extensionId) return;

  const tab: { id?: number } | null = sender.tab || null;

  if (message.source === 'popup') {
    sendResponse({ hello: 'form background' });
  }

  if (tab && tab.id) {
    if (message.method === 'get') {
      if (tabs[tab.id]) {
        sendResponse({ dictionaries, ...tabs[sender.tab.id] });
      } else {
        tabs[tab.id] = { ...defaultTabConfig };
        sendResponse({ dictionaries, ...defaultTabConfig });
      }
    }

    if (message.method === 'update') {
      console.log({ message });
      const { phrase, pinned } = message.data;

      tabs[tab.id] = { phrase, pinned };

      sendResponse({ phrase, pinned });
    }
  }
});
