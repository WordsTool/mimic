import MessageSender = chrome.runtime.MessageSender;

export interface ContextType<A=any, B=any> {
  tabId: number,
  data: A,
  sendResponse: (response: B) => void,
}

export interface MessengerListener {
  type: string,
  controller: (ctx: ContextType) => (void | Promise<void>);
}

export interface MessengerOptions {
  listen?: MessengerListener[];
}

export default class Messenger {
  private listeners: Array<MessengerListener>;

  private readonly extensionId: string;

  constructor(options: MessengerOptions) {
    const { listen } = options;
    this.extensionId = chrome.runtime.id;

    this.listeners = listen ? [...listen] : [];

    this.subscribeToRuntime();
  }

  // eslint-disable-next-line max-len
  private onRuntimeMessage(message: any | { type: string, data: any }, sender: MessageSender, sendResponse: (response?: any) => void) {
    console.log('on message: ', { message, sender });
    if (sender.id !== this.extensionId) return;
    if (typeof message !== 'object') return;

    const { tab } = sender;
    const { type: messageType, data } = message;

    const messageListeners = this.listeners.filter(({ type }) => type === messageType);

    messageListeners.forEach(({ controller }) => {
      controller({
        tabId: tab ? tab.id : null,
        data,
        sendResponse,
      });
    });
  }

  public addListener(listener: MessengerListener): void {
    this.listeners.push(listener);
  }

  private subscribeToRuntime() {
    chrome.runtime.onMessage.addListener((...args) => this.onRuntimeMessage(...args));
  }

  public request<B=any, A=any>(type: string, data: A, callback?: (response: B) => any) {
    chrome.runtime.sendMessage(this.extensionId, { type, data }, callback);
  }

  // eslint-disable-next-line class-methods-use-this
  public sentToTabs<A=any>(message: A) {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(({ id }) => {
        chrome.tabs.sendMessage(id, message);
      });
    });
  }
}

console.log(chrome.runtime.onMessage.addListener);
