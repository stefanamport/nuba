import { UserAccountComponent } from './user-account.component';
import { User } from '../login/user';
import { Genders, ActivityLevels } from './user-account.constants';
import { Observable } from 'rxjs';

class LoginServiceStub {

  getUser() {
    let user = new User();
    user.name = 'Hans';
    user.birthday = '12.03.1990';
    user.activityLevel = ActivityLevels[0];
    user.bodyheight = 170;
    user.bodyweight = 65;
    user.hoursOfSport = 3;

    return user;
  }

  getUserAsObservable() {
    return Observable.of(this.getUser());
  }
}

class UserAccountServiceStub {
  calculateAge() { }

  updateUserInfo(user: User) { }
}

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let userAccountService: any = new UserAccountServiceStub();
  let loginService: any = new LoginServiceStub();

  beforeEach(() => {
    component = new UserAccountComponent(loginService, userAccountService);
    component.ngOnInit();
  });

  it('should create UserAccountComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should load user', () => {
    expect(component.user).toBeDefined();
  });

  it('should load genders', () => {
    component.genders = Genders;
    expect(component.genders).toBe(component.genders);
  });

  it('should load activity levels', () => {
    component.activityLevels = ActivityLevels;
    expect(component.activityLevels).toBe(component.activityLevels);
  });

  it('should validate ok', () => {
    let user = loginService.getUser();
    component.user = user;
    spyOn(userAccountService, 'calculateAge').and.returnValue(18);

    let valid = component.validateForm();
    expect(true).toEqual(valid);
  });

  it('should validate nok - too young', () => {
    let user = loginService.getUser();
    component.user = user;

    spyOn(userAccountService, 'calculateAge').and.returnValue(17);
    let valid = component.validateForm();

    expect(false).toEqual(valid);
    let expectedMsg = 'Zu jung... Leider können wir für unter 18-jährige keine zuverlässigen Berechnungen anbieten.';
    expect(expectedMsg).toEqual(component.formValidation.messages[0]);
  });

  it('should validate nok - too tall / heavy ', () => {
    let user = loginService.getUser();
    user.bodyheight = 300;
    user.bodyweight = 300;
    component.user = user;

    spyOn(userAccountService, 'calculateAge').and.returnValue(18);
    let valid = component.validateForm();

    expect(false).toEqual(valid);
    let expectedMsg1 = 'Bitte trage deine korrekte Körpergrösse ein';
    let expectedMsg2 = 'Bitte trage dein korrektes Gewicht ein';
    expect(component.formValidation.messages).toContain(expectedMsg1);
    expect(component.formValidation.messages).toContain(expectedMsg2);
  });

  it('should validate nok - too active', () => {
    let user = loginService.getUser();
    user.hoursOfSport = 70;
    component.user = user;

    spyOn(userAccountService, 'calculateAge').and.returnValue(18);
    let valid = component.validateForm();

    expect(false).toEqual(valid);
    let expectedMsg = user.hoursOfSport + ' Stunden Sport pro Woche? ;-) Wirklich?';
    expect(expectedMsg).toEqual(component.formValidation.messages[0]);
  });

  it('should save user', () => {
    spyOn(component, 'validateForm').and.returnValue(true);
    component.saveUser();
    expect(component.savedMessage.message).toEqual('Angaben wurden gespeichert');
  });

  it('should not save user', () => {
    spyOn(component, 'validateForm').and.returnValue(false);
    component.saveUser();
    expect(component.savedMessage.message).toEqual('Nicht gespeichert, bitte Angaben prüfen.');
  });
});
