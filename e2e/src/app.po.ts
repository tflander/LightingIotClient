import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getPageText(): Promise<string> {
    return element(by.css('app-root .content')).getText();
  }
}
