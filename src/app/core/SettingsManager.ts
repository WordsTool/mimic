import DictionaryStorage from './Dictionaries';
import SettingsStorage from './SettingsStorage';

import CommonSettingsWithConfig = mimic.CommonSettingsWithConfig;
import CommonSettingsType = mimic.CommonSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import StorageSettingsType = mimic.StorageSettingsType;


type SettingsManagerOptions = {
  dictionaryStorage: DictionaryStorage,
  settingsStorage: SettingsStorage,
};

export default class SettingsManager {
  private dictionaryStorage: DictionaryStorage;

  private settingsStorage: SettingsStorage;

  constructor({ settingsStorage, dictionaryStorage }: SettingsManagerOptions) {
    this.settingsStorage = settingsStorage;
    this.dictionaryStorage = dictionaryStorage;
  }

  update(data: UpdateCommonSettings): Promise<StorageSettingsType> {
    return new Promise((resolve) => {
      this.settingsStorage.update(data).then((updetedSettings) => {
        this.dictionaryStorage.updateConfig(updetedSettings.dictionariesConfig);
        resolve(updetedSettings);
      });
    });
  }

  getContentSettings(): CommonSettingsType {
    const settings = {
      ...this.settingsStorage.get(),
      dictionaries: this.dictionaryStorage.getActiveList(),
    };

    delete settings.dictionariesConfig;

    return settings;
  }


  getFullSettings(): CommonSettingsWithConfig {
    return {
      ...this.settingsStorage.get(),
      dictionaries: this.dictionaryStorage.getList(),
    };
  }
}
