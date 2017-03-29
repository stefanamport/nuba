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

  it('should do login and search for food', () => {
    page.navigateTo('login');

    // login first
    let loginExec = new LoginExecution();
    loginExec.doLogin();

    // then search for food
    let searchExec = new SearchExecution();
    searchExec.searchFood();
  });

  class LoginExecution {

    doLogin() {

      // acitvate login
      let buttonLogin = element(by.buttonText('log in'));
      expect(buttonLogin.isPresent()).toBeTruthy();
      buttonLogin.click();

      // enter account details
      let emailInput = element(by.css('input[name="reginfoMail"]'));
      expect(emailInput.isPresent()).toBeTruthy();
      emailInput.sendKeys('e2e@nuba.ch');

      let passInput = element(by.css('input[name="reginfoPass"]'));
      expect(passInput.isPresent()).toBeTruthy();
      passInput.sendKeys('e2etest');

      // log in
      let buttonAnmelden = element(by.buttonText('anmelden mit E-Mail'));
      expect(buttonAnmelden.isPresent()).toBeTruthy();
      buttonAnmelden.click();

      browser.driver.sleep(2000);

      // Go to Search Page
      let buttonLoslegen = element(by.linkText('gleich loslegen'));
      expect(buttonLoslegen.isPresent()).toBeTruthy();
      buttonLoslegen.click();

      browser.driver.sleep(5000);

      // check whether search input field is available after login
      let searchInput = element(by.css('.searchbar__maininput'));
      expect(searchInput.isPresent()).toBeTruthy();
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
