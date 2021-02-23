import StorageSettingsType = mimic.StorageSettingsType;
import UpdateCommonSettings = mimic.UpdateCommonSettings;
import DictionaryConfig = mimic.DictionaryConfig;

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

  // removes unsupported and adds the appeared of dictionaries config
  private updateDictionariesConfig() {
    const initialList: DictionaryConfig[] = [...this.initial.dictionariesConfig];
    const currentList: DictionaryConfig[] = [];

    this.current.dictionariesConfig.forEach((item) => {
      const { id: currentId } = item;
      const index = initialList.findIndex(({ id }) => id === currentId);

      if (index !== -1) {
        currentList.push(item); // add if in initial list
        initialList.splice(index, 1); // remove from initial list
      }
    });

    // concat current config list and rest initial dictionaries
    this.current.dictionariesConfig = [...currentList, ...initialList];
  }

  public async fetch(): Promise<StorageSettingsType> {
    return new Promise((resolve) => {
      chrome.storage.sync.get([STORAGE_NAME], (result) => {
        this.current = result && result[STORAGE_NAME] ? result[STORAGE_NAME].data : this.initial;

        this.updateDictionariesConfig();

        resolve(this.current);
      });
    });
  }
}
