import { AngularCliProjectPage } from './app.po';
import { element, by, browser } from 'protractor';

describe('angular-cli-project App', function() {
  let page: AngularCliProjectPage;

  beforeEach(() => {
    page = new AngularCliProjectPage();
  });

  it('should display welcome screen', () => {
    page.navigateTo('');
    expect(page.getParagraphText()).toContain('nuba');
    expect(page.getParagraphText()).toContain('Dein Food-Coach.');
  });

  it('should display login buttons', () => {
    page.navigateTo('login');
    let elem = element(by.css('.loginbox__buttons'));
    expect(elem.isPresent()).toBeTruthy();
  });

  it('should do login', () => {
    page.navigateTo('login');

    let button = element(by.buttonText('Login mit Google Konto'));
    expect(button.isPresent()).toBeTruthy();

    // click 'Login mit Google Konto' button
    button.click();
    browser.driver.sleep(2000);

    browser.getAllWindowHandles().then(function (handles) {
      // pop up opens to login with Google account
      browser.switchTo().window(handles[1]);
      browser.driver.sleep(2000);
      expect(browser.getCurrentUrl()).toContain('https://accounts.google.com/ServiceLogin');

      // set email
      element(by.css('#Email')).sendKeys('nubaawesometest@gmail.com');

      // click on next button
      let nextButton = element(by.css('#next'));
      nextButton.click();
      browser.driver.sleep(2000);

      // set password
      element(by.css('#Passwd')).sendKeys('1nuba2awesome3test');

      // click signin button
      element(by.css('#signIn')).click();

      // wait 5 seconds while authentication takes place
      browser.driver.sleep(5000);

      // switch back to nuba's window
      browser.driver.switchTo().window(handles[0]);
    });
  });

  it('should search for food', () => {
    // user is already logged in from previous test 'should do login'

    // search for 'Brot'
    let searchInput = element(by.css('.searchbar__maininput'));
    searchInput.sendKeys('Brot');
    browser.driver.sleep(1000);

    // search term should be found and therefore result list must not be empty
    let resultList = element.all(by.css('.resultlist__entry'));
    let numberOfElements = resultList.count();
    expect(numberOfElements).toBeGreaterThan(0);
  });
});
