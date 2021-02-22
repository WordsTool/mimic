import DictionaryConfig = mimic.DictionaryConfig;
import Dictionary = mimic.Dictionary;

class DictionaryStorage {
  private list: Dictionary[];

  private listConfig: DictionaryConfig[];

  constructor(options: { list: Dictionary[], listConfig: DictionaryConfig[] }) {
    this.list = options.list;
    this.listConfig = this.initConfig(options.listConfig);
  }

  private initConfig(listConfig: DictionaryConfig[]): DictionaryConfig[] {
    // init with default sort
    if (!listConfig || listConfig.length === 0) {
      return this.list.map(({ id }) => ({ id, off: false }));
    }
    return listConfig;
  }

  get dictionariesConfig(): DictionaryConfig[] {
    return this.listConfig;
  }

  public updateConfig(newListConfig: DictionaryConfig[]): void {
    this.listConfig = newListConfig;
  }

  public getList(): Dictionary[] {
    return this.list;
  }

  public getActiveList(): Dictionary[] {
    return this.listConfig.map(({ id: configId, off }) => {
      const dictionary = this.list.find(({ id }) => (id === configId && off === false));
      return dictionary;
    }).filter((e) => !!e);
  }
}

export default DictionaryStorage;
