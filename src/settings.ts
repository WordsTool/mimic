import ContentTabSettingsType = mimic.ContentTabSettingsType;
import BaseSettings = mimic.BaseSettings;

export const commonSettings: BaseSettings = {
  disabled: false,
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
