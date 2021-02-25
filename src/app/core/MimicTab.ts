import ContentTabSettingsType = mimic.ContentTabSettingsType;
import Tab = chrome.tabs.Tab;

const tabsStorage: { [key: number]: ContentTabSettingsType } = {};
const injectedList: { [key: number]: boolean } = {};

export default class MimicTab {
  static getCurrentTab(): Promise<Tab | undefined> {
    return new Promise((resolve) => {
      chrome.tabs.getCurrent((tab) => {
        resolve(tab);
      });
    });
  }

  static async getNextTabIndex(tab?: Tab): Promise<number | undefined> {
    const currentTab = tab || await this.getCurrentTab();

    if (currentTab) return currentTab.index + 1;

    return undefined;
  }

  static injectContent(): void {
    chrome.tabs.executeScript({
      file: 'js/content.js',
    });
  }

  static isInjected(id: number): boolean {
    return !!injectedList[id];
  }

  static addInjected(id: number): void {
    injectedList[id] = true;
  }

  static removeInjected(id: number): void {
    delete injectedList[id];
  }

  static injectPopup = (id: number): void => {
    chrome.browserAction.setPopup({
      tabId: id,
      popup: 'popup.html',
    });
  };

  static createNextTab(url: string, tabSettings: ContentTabSettingsType, tab: Tab) {
    MimicTab.getNextTabIndex(tab).then((index) => {
      chrome.tabs.create({ active: true, url, index }, (createdTab: Tab) => {
        MimicTab.updateTabSetting(createdTab.id, tabSettings);
        MimicTab.injectPopup(createdTab.id);
        MimicTab.addInjected(createdTab.id);
      });
    });
  }

  static getTabSettings(tabId: number): ContentTabSettingsType | null {
    return tabsStorage[tabId];
  }

  static updateTabSetting(
    tabId: number, newSettings: ContentTabSettingsType,
  ): ContentTabSettingsType {
    const currentSettings = MimicTab.getTabSettings(tabId) || {};
    const updatedSettings = { ...currentSettings, ...newSettings };
    tabsStorage[tabId] = updatedSettings;

    return updatedSettings;
  }

  static removeTabSettings(tabId: number) {
    delete tabsStorage[tabId];
  }
}
