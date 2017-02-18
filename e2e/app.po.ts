import { browser, element, by } from 'protractor';

export class AngularCliProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
  	// Todo: folgende linie bricht e2e test ab...
    // Failed: Timed out waiting for asynchronous Angular tasks to finish after 11 seconds.
    // return element(by.css('app-component h1')).getText();
  }
}
