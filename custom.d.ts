declare module 'css-prefers-color-scheme' {
  export default function fn(): { scheme: 'dark' | 'light' };
}

declare module 'dictionaries.json' {
  const Value: { name: string, url: string, id: string }[];
  export default Value;
}

declare namespace mimic {
  export interface Dictionary {
    id: string,
    url: string,
    name: string,
    space?: string,
  }

  export type UIVerticalType = 'top' | 'center' | 'bottom';

  export type UIHorizontalType = 'left' | 'right';

  export type UIPanelPosition = UIHorizontalType;

  export type UIColorSchemeType = 'dark' | 'light';

  export type UITailPosition = {
    horizontal: UIHorizontalType,
    vertical: UIVerticalType,
  };

  export type UIPosition = {
    panel: UIPanelPosition,
    tail: UITailPosition,
  };

  export type UIThemeType = { theme: UIColorSchemeType };

  export type UIType = UIPosition & UIThemeType;
  export interface DictionaryConfig {
    id: string,
    off: boolean,
  }

  export type BaseSettings = {
    disabled: boolean,
    ui: UIType,
  };

  export type CommonSettingsType = BaseSettings & {
    dictionaries: Dictionary[],
  };

  export type StorageSettingsType = BaseSettings & {
    dictionariesConfig: DictionaryConfig[],
  };

  export type CommonSettingsWithConfig = StorageSettingsType & {
    dictionaries: Dictionary[],
  };

  export interface UpdateCommonSettings {
    disabled?: boolean,
    ui?: UIType,
    dictionariesConfig?: DictionaryConfig[],
  }

  export interface ContentTabSettingsType {
    pinned: boolean,
    phrase: string,
  }

  export type ContentInitialDataType = ContentTabSettingsType & CommonSettingsType;
}

declare namespace mimic.popup {
  export type EventCommonSetting = { name: 'disabled', value: boolean }
  | { name: 'ui', value: UIType }
  | { name: 'dictionariesConfig', value: DictionaryConfig[] };
}
