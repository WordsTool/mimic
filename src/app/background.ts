import DictionaryStorage from './core/Dictionaries';
import Messenger, { ContextType } from './core/Messenger';
import MimicMenu from './core/MimicMenu';
import getDictionaryUrl from './utils/getDictionaryUrl';
import {
  commonSettings,
  defaultTabConfig,
} from '../settings';
import dictionaries from '../../dictionaries.json';
import MimicTab from './core/MimicTab';
import SettingsStorage from './core/SettingsStorage';
import SettingsManager from './core/SettingsManager';
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import ContentInitialDataType = mimic.ContentInitialDataType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
// eslint-disable-next-line @typescript-eslint/no-use-before-define
import Tab = chrome.tabs.Tab;
import OnClickData = chrome.contextMenus.OnClickData;
import Dictionary = mimic.Dictionary;
import StorageSettingsType = mimic.StorageSettingsType;
// eslint-disable-next-line @typescript-eslint/no-use-before-define

const initialSettings: StorageSettingsType = {
  ...commonSettings,
  dictionariesConfig: dictionaries.map(({ id }) => ({ id, off: false })),
};

const settingsStorage = new SettingsStorage(initialSettings);

settingsStorage.fetch().then(() => {
  const dictStore = new DictionaryStorage({
    list: dictionaries,
    listConfig: settingsStorage.get().dictionariesConfig,
  });

  const messenger = new Messenger();
  const mimicMenu = new MimicMenu();
  const settingsManager = new SettingsManager({ dictionaryStorage: dictStore, settingsStorage });


  const getTabSettings = ({ tabId, sendResponse }: ContextType<null, ContentInitialDataType>) => {
    if (!tabId) return;

    const savedSettings = MimicTab.getTabSettings(tabId) || {};

    sendResponse({
      ...defaultTabConfig,
      ...savedSettings,
      ...settingsManager.getContentSettings(),
    });
  };

  const updateTabSettings = ({ tabId, data }: ContextType<ContentTabSettingsType>) => {
    if (!tabId) return;

    MimicTab.updateTabSetting(tabId, data);
  };

  const getCommonSettings = (
    ctx: ContextType<null, StorageSettingsType>,
  ) => {
    ctx.sendResponse(settingsManager.getFullSettings());
  };

  const updateCommonSettings = (ctx: ContextType<UpdateCommonSettings>) => {
    settingsManager.update(ctx.data).then(() => {
      const newActiveDictionaries = dictStore.getActiveList();

      mimicMenu.update({ dictionaries: newActiveDictionaries });

      messenger.sentToTabs({
        type: 'sync_tab_common_settings',
        data: settingsManager.getContentSettings(),
      });
    });
  };

  const resetCommonSettings = ({ sendResponse }: ContextType) => {
    settingsManager.reset().then(() => {
      const newActiveDictionaries = dictStore.getActiveList();
      sendResponse({ ok: true });
      mimicMenu.update({ dictionaries: newActiveDictionaries });

      messenger.sentToTabs({
        type: 'sync_tab_common_settings',
        data: settingsManager.getContentSettings(),
      });
    });
    sendResponse();
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

  const onMenuPressAdd = (info: OnClickData, { id }: Tab) => {
    chrome.tabs.sendMessage(id, {
      type: 'sync_tab_common_settings',
      data: { phrase: info.selectionText },
    });
  };

  messenger.addListeners([
    { type: 'get_tab_settings', controller: getTabSettings },
    { type: 'update_tab_settings', controller: updateTabSettings },
    { type: 'update_common_settings', controller: updateCommonSettings },
    { type: 'reset_common_settings', controller: resetCommonSettings },
    { type: 'get_common_settings', controller: getCommonSettings },
    { type: 'open_in_new_tab', controller: openInNewTab },
  ]);

  mimicMenu.init({
    dictionaries: dictStore.getActiveList(),

    onPressAdd: onMenuPressAdd,

    onPressDictionary: onMenuPressDictionary,
  });
});
