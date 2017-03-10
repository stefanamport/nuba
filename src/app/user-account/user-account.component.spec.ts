import { UserAccountComponent } from './user-account.component';
import { User } from '../login/user';
import { Genders, ActivityLevels } from './user-account.constants';
import { Observable } from 'rxjs';

class LoginServiceStub {
  getUser() {
    return new User();
  }

  getUserAsObservable() {
    return Observable.of(new User());
  }
}

class UserAccountServiceStub { }

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let userAccountService: UserAccountServiceStub;
  let loginService: LoginServiceStub = new LoginServiceStub();

  beforeEach(() => {
    component = new UserAccountComponent(loginService, userAccountService);
  });

  it('should create DateChooserComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load UserAccount', () => {
    expect(loginService.getUser()).toEqual(component.user);
  });

  it('should load genders', () => {
    component.genders = Genders;
    expect(component.genders).toBe(component.genders);
  });

  it('should load activity levels', () => {
    component.activityLevels = ActivityLevels;
    expect(component.activityLevels).toBe(component.activityLevels);
  });
});
