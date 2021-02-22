import dictionaries from '../dictionaries.json';
import CommonSettingsType = mimic.CommonSettingsType;
import ContentTabSettingsType = mimic.ContentTabSettingsType;

export const commonSettings: CommonSettingsType = {
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

export const defaultTabConfig: ContentTabSettingsType = {
  pinned: false,
  phrase: '',
};
