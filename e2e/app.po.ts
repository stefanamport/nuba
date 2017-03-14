import { browser, element, by } from 'protractor';

export class AngularCliProjectPage {
  navigateTo(page) {
    return browser.get('/' + page);
  }

  getParagraphText() {
    browser.waitForAngularEnabled(false);
    return element(by.css('app-component h1')).getText();
  }
}
