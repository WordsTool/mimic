import DictionaryStorage from './core/Dictionaries';
import Messenger, { ContextType } from './core/Messenger';
import MimicMenu from './core/MimicMenu';
import getDictionaryUrl from './utils/getDictionaryUrl';
import {
  commonSettings,
  defaultTabConfig,
} from '../settings';
import MimicTab from './core/MimicTab';
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import ContentInitialDataType = mimic.ContentInitialDataType;
import CommonSettingsType = mimic.CommonSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import DictionaryConfig = mimic.DictionaryConfig;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;
import Dictionary = mimic.Dictionary;
// eslint-disable-next-line @typescript-eslint/no-use-before-define


const dictStore = new DictionaryStorage({ list: commonSettings.dictionaries, listConfig: [] });
const messenger = new Messenger();
const mimicMenu = new MimicMenu();


const getTabSettings = ({ tabId, sendResponse }: ContextType<any, ContentInitialDataType>) => {
  if (!tabId) return;

  const savedSettings = MimicTab.getTabSettings(tabId) || {};

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

  MimicTab.updateTabSetting(tabId, data);
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
  const newDictionariesConfig = ctx.data.dictionariesConfig;
  delete ctx.data.dictionariesConfig;
  Object.assign(commonSettings, ctx.data);

  if (newDictionariesConfig) {
    dictStore.updateConfig(newDictionariesConfig);
  }

  const newActiveDictionaries = dictStore.getActiveList();

  mimicMenu.update({ dictionaries: newActiveDictionaries });

  messenger.sentToTabs({
    type: 'sync_tab_common_settings',
    data: { ...commonSettings, dictionaries: newActiveDictionaries },
  });
};

const openInNewTab = async ({ tabId, data, sender }: ContextType<{ url: string }>) => {
  const currentSettings = MimicTab.getTabSettings(tabId) || defaultTabConfig;
  const { url } = data;

  MimicTab.createNextTab(url, currentSettings, sender.tab);
};

const onMenuPressDictionary = (info: OnClickData, tab: Tab, dictionary: Dictionary) => {
  const savedSettings = MimicTab.getTabSettings(tab.id) || defaultTabConfig;
  const phrase = info.selectionText;
  const url = getDictionaryUrl(dictionary.url, phrase);

  MimicTab.createNextTab(url, { ...savedSettings, phrase }, tab);
};

const onMenuPressAdd = (info: OnClickData, tab: Tab) => {
  chrome.tabs.query({ active: true }, (activeTabs: Tab[]) => {
    activeTabs.forEach(({ id }) => {
      chrome.tabs.sendMessage(id, {
        type: 'sync_tab_common_settings',
        data: { phrase: info.selectionText },
      });
    });
  });
};

messenger.addListeners([
  { type: 'get_tab_settings', controller: getTabSettings },
  { type: 'update_tab_settings', controller: updateTabSettings },
  { type: 'update_common_settings', controller: updateCommonSettings },
  { type: 'get_common_settings', controller: getCommonSettings },
  { type: 'open_in_new_tab', controller: openInNewTab },
]);

mimicMenu.init({
  dictionaries: dictStore.getActiveList(),

  onPressAdd: onMenuPressAdd,

  onPressDictionary: onMenuPressDictionary,
});
