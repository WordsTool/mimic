import dictionaries from './dictionaries';
import DictionaryStorage from './core/Dictionaries';
import Messenger, { ContextType, MessengerOptions } from './core/Messenger';
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import ContentInitialDataType = mimic.ContentInitialDataType;
import CommonSettingsType = mimic.CommonSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import DictionaryConfig = mimic.DictionaryConfig;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import Tab = chrome.tabs.Tab;

const dictStore = new DictionaryStorage({ list: dictionaries, listConfig: [] });

const commonSettings: CommonSettingsType = {
  disabled: false,
  dictionaries,
  ui: {
    panel: 'left',
    tail: {
      horizontal: 'left',
      vertical: 'center',
    },
    theme: 'light',
  },
};

const defaultTabConfig: ContentTabSettingsType = {
  pinned: false,
  phrase: '',
};

const tabs: {
  [key: number]: ContentTabSettingsType,
} = {};

const getTabSettings = ({ tabId, sendResponse }: ContextType<any, ContentInitialDataType>) => {
  if (!tabId) return;

  const savedSettings = tabs[tabId] || {};

  sendResponse({
    ...defaultTabConfig,
    ...savedSettings,
    ...{
      ...commonSettings,
      dictionaries: dictStore.getActiveList(),
    },
  });
};

const updateTabSettings = ({ tabId, data }: ContextType<ContentTabSettingsType>) => {
  if (!tabId) return;

  const savedSettings = tabs[tabId] || {};

  tabs[tabId] = { ...savedSettings, ...data };
};

const getCommonSettings = (
  ctx: ContextType<any, CommonSettingsType & { dictionariesConfig: DictionaryConfig[] }>,
) => {
  ctx.sendResponse({
    ...commonSettings,
    dictionariesConfig: dictStore.dictionariesConfig,
  });
};

const updateCommonSettings = (ctx: ContextType<UpdateCommonSettings>) => {
  console.log(ctx.data);
  const newDictionariesConfig = ctx.data.dictionariesConfig;
  delete ctx.data.dictionariesConfig;
  Object.assign(commonSettings, ctx.data);

  if (newDictionariesConfig) {
    dictStore.updateConfig(newDictionariesConfig);
  }

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  messenger.sentToTabs({
    type: 'sync_tab_common_settings',
    data: { ...commonSettings, dictionaries: dictStore.getActiveList() },
  });
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
