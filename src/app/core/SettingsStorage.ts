import StorageSettingsType = mimic.StorageSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;

const STORAGE_NAME = 'MIMIC_DICTIONARY_SETTINGS';


const PROPERTIES: ('ui' | 'disabled' | 'dictionariesConfig')[] = ['ui', 'disabled', 'dictionariesConfig'];

export default class SettingsStorage {
  private readonly initial: StorageSettingsType;

  private current: StorageSettingsType;

  private version = 1;

  constructor(initialSettings: StorageSettingsType) {
    this.initial = initialSettings;
  }

  get(): StorageSettingsType {
    return this.current || this.initial;
  }

  public async update(settings: UpdateCommonSettings): Promise<StorageSettingsType> {
    const newSettings: UpdateCommonSettings = {};

    PROPERTIES.forEach((key) => {
      if (!(typeof settings[key] === 'undefined')) {
        Object.assign(newSettings, { [key]: settings[key] });
      }
    });

    this.current = { ...this.get(), ...newSettings };

    return new Promise((resolve) => {
      chrome.storage.sync.set(
        { [STORAGE_NAME]: { version: this.version, data: this.get() } },
        () => {
          resolve(this.current);
        },
      );
    });
  }

  public async fetch(): Promise<StorageSettingsType> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([STORAGE_NAME], (result) => {
        this.current = result && result[STORAGE_NAME] ? result[STORAGE_NAME].data : this.initial;

        resolve(this.current);
      });
    });
  }
}
