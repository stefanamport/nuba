import { browser, element, by } from 'protractor';

export class AngularCliProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-component h1')).getText();
  }
}
