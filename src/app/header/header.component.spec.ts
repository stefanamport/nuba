import { HeaderComponent } from './header.component';
import {User} from '../login/user';
import {Observable} from 'rxjs';

class LoginServiceStub {

  getUserAsObservable() {
    return Observable.of(new User());
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let loginService: <any> = new LoginServiceStub();

  beforeEach(() => {
    component = new HeaderComponent(loginService);
  });

  it('should create HeaderComponent', () => {
    expect(component).toBeTruthy();
  });
});
