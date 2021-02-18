import dictionaries from './dictionaries';
import Messenger, { ContextType, MessengerOptions } from './core/Messenger';
import ContentTabSettingsType = mimic.ContentTabSettingsType;
import ContentInitialDataType = mimic.ContentInitialDataType;
import CommonSettingsType = mimic.CommonSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import DictionariesConfig = mimic.DictionariesConfig;

const commonSettings: CommonSettingsType = {
  disabled: true,
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

const options: MessengerOptions = {
  listen: [
    { type: 'get_tab_settings', controller: getTabSettings },
    { type: 'update_tab_settings', controller: updateTabSettings },
    { type: 'update_common_settings', controller: updateCommonSettings },
    { type: 'get_common_settings', controller: getCommonSettings },
  ],
};

const messenger = new Messenger(options);
