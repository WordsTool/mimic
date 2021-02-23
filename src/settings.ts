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

export const contacts: { email: string, patreon: { url: string, text: string } } = {
  email: 'mimic.dictionary@gmail.com',
  patreon: {
    url: 'https://www.patreon.com/mimicdictionary',
    text: 'patreon.com/mimicdictionary',
  },
};
