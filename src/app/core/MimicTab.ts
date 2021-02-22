import ContentTabSettingsType = mimic.ContentTabSettingsType;
import Tab = chrome.tabs.Tab;

const tabsStorage: { [key: number]: ContentTabSettingsType } = {};

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

  static createNextTab(url: string, tabSettings: ContentTabSettingsType, tab: Tab) {
    MimicTab.getNextTabIndex(tab).then((index) => {
      chrome.tabs.create({ active: true, url, index }, (createdTab: Tab) => {
        MimicTab.updateTabSetting(createdTab.id, tabSettings);
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
}
