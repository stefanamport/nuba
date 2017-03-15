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

  /*
   * This test works locally but is commented out because of security issues:
   * 1. Password needs to be checked in
   * 2. Travis CI server is located in the US. Google blocks login because they notice it is not possible
   *    that I am in the US now.
   */
  /*it('should do login and search for food', () => {
    page.navigateTo('login');

    // login first
    let loginExec = new LoginExecution();
    loginExec.doLogin();

    // then search for food
    let searchExec = new SearchExecution();
    searchExec.searchFood();
  });*/

  class LoginExecution {

    doLogin() {
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
        let emailInput = element(by.css('#Email'));
        expect(emailInput.isPresent()).toBeTruthy();
        emailInput.sendKeys('xxx');

        // click on next button
        let nextButton = element(by.css('#next'));
        expect(nextButton.isPresent()).toBeTruthy();
        nextButton.click();
        browser.driver.sleep(2000);

        // set password
        let pwInput = element(by.css('#Passwd'));
        expect(pwInput.isPresent()).toBeTruthy();
        pwInput.sendKeys('xxx');

        // click signin button
        let signinButton = element(by.css('#signIn'));
        expect(signinButton.isPresent()).toBeTruthy();
        signinButton.click();

        // wait 5 seconds while authentication takes place
        browser.driver.sleep(5000);

        // switch back to nuba's window
        browser.driver.switchTo().window(handles[0]);

        // check whether search input field is available after login
        let searchInput = element(by.css('.searchbar__maininput'));
        expect(searchInput.isPresent()).toBeTruthy();
      });
    }
  }

  class SearchExecution {

    searchFood() {
      // search for 'Brot'
      let searchInput = element(by.css('.searchbar__maininput'));
      searchInput.sendKeys('Brot');
      browser.driver.sleep(1000);

      // search term should be found and therefore result list must not be empty
      let resultList = element.all(by.css('.resultlist__entry'));
      let numberOfElements = resultList.count();
      expect(numberOfElements).toBeGreaterThan(0);
    }
  }
});
