import i18n from '../utils/i18n';
import Dictionary = mimic.Dictionary;
import OnClickData = chrome.contextMenus.OnClickData;
import Tab = chrome.tabs.Tab;

type OnPressAdd = (info: OnClickData, tab: Tab) => void;

type OnPressDictionary = (info: OnClickData, tab: Tab, dictionary: Dictionary) => void;

type MimicMenuInitOptions = {
  dictionaries: Dictionary[],
  onPressAdd: OnPressAdd,
  onPressDictionary: OnPressDictionary;
};

class MimicMenu {
  private addId = 'add';

  private addSeparatorId = 'addSeparator';

  private onPressAdd: OnPressAdd;

  private onPressDictionary: OnPressDictionary;

  private currentDictionaries: string[] = [];

  private createAddItem() {
    chrome.contextMenus.create({
      id: this.addId,
      title: i18n('context_menu_add_phrase'),
      contexts: ['selection'],
      onclick: (...args) => this.onPressAdd(...args),
    });
    chrome.contextMenus.create({
      id: this.addSeparatorId,
      type: 'separator',
      contexts: ['selection'],
    });
  }

  private createDictionaryItems(dictionaries: Dictionary[]) {
    dictionaries.forEach((dictionary) => {
      chrome.contextMenus.create({
        id: dictionary.id,
        title: dictionary.name,
        contexts: ['selection'],
        onclick: (info, tab) => this.onPressDictionary(info, tab, dictionary),
      });
      this.currentDictionaries.push(dictionary.id);
    });
  }

  private removeDictionaryItems() {
    this.currentDictionaries.forEach((id) => {
      chrome.contextMenus.remove(id);
    });
  }

  init({ dictionaries, onPressAdd, onPressDictionary }: MimicMenuInitOptions): void {
    this.onPressAdd = onPressAdd;
    this.onPressDictionary = onPressDictionary;
    this.createAddItem();
    this.createDictionaryItems(dictionaries);
  }

  update({ dictionaries }: { dictionaries: Dictionary[] }): void {
    this.removeDictionaryItems();
    this.createDictionaryItems(dictionaries);
  }
}

export default MimicMenu;
