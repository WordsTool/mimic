import dictionaries from './dictionaries';
import Messenger, { ContextType, MessengerOptions } from './core/Messenger';
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import ContentInitialDataType = mimic.ContentInitialDataType;
import CommonSettingsType = mimic.CommonSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import DictionariesConfig = mimic.DictionariesConfig;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import Tab = chrome.tabs.Tab;

const commonSettings: CommonSettingsType = {
  disabled: false,
  dictionaries,
  ui: {
    panel: 'left',
    tail: {
      horizontal: 'left',
      vertical: 'center',
    },
  },
};

const defaultTabConfig: ContentTabSettingsType = {
  pinned: false,
  phrase: '',
};

const dictionariesConfigs: DictionariesConfig[] = dictionaries
  .map(({ id }) => ({ id, off: false }));

console.log(dictionariesConfigs);

const tabs: {
  [key: number]: ContentTabSettingsType,
} = {};

const getTabSettings = ({ tabId, sendResponse }: ContextType<any, ContentInitialDataType>) => {
  if (!tabId) return;

  const savedSettings = tabs[tabId] || {};

  sendResponse({
    ...defaultTabConfig,
    ...savedSettings,
    ...commonSettings,
  });
};

const updateTabSettings = ({ tabId, data }: ContextType<ContentTabSettingsType>) => {
  if (!tabId) return;

  const savedSettings = tabs[tabId] || {};

  tabs[tabId] = { ...savedSettings, ...data };
};

const getCommonSettings = (ctx: ContextType<any, CommonSettingsType>) => {
  ctx.sendResponse(commonSettings);
};

const updateCommonSettings = (ctx: ContextType<UpdateCommonSettings>) => {
  console.log(ctx.data);
  Object.assign(commonSettings, ctx.data);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  messenger.sentToTabs({ type: 'sync_tab_common_settings', data: commonSettings });
  // sync_tab_common_settings
};

const getCurrentTab = (): Promise<Tab | undefined> => new Promise((resolve) => {
  chrome.tabs.getCurrent((tab) => {
    resolve(tab);
  });
});

const openInNewTab = async ({ tabId, data, sender }: ContextType<{ url: string }>) => {
  const savedSettings = tabs[tabId];
  const { url } = data;
  const currentTab = await getCurrentTab() || sender.tab;

  const senderTabIndex = currentTab ? currentTab.index : null;
  const options: { active: boolean, url: string, index?: number } = { active: true, url };

  if (typeof senderTabIndex === 'number') {
    options.index = senderTabIndex + 1;
  }

  console.log({ senderTabIndex, options });

  chrome.tabs.create(options, (tab: Tab) => {
    if (savedSettings) {
      tabs[tab.id] = { ...savedSettings };
    }
  });
};

const options: MessengerOptions = {
  listen: [
    { type: 'get_tab_settings', controller: getTabSettings },
    { type: 'update_tab_settings', controller: updateTabSettings },
    { type: 'update_common_settings', controller: updateCommonSettings },
    { type: 'get_common_settings', controller: getCommonSettings },
    { type: 'open_in_new_tab', controller: openInNewTab },
  ],
};

const messenger = new Messenger(options);
