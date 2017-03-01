import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { FIREBASE_PROVIDERS, defaultFirebase, AngularFire } from 'angularfire2';

import { UserAccountComponent } from './user-account.component';
import { LoginServiceStub } from '../login/testing/fake.user.service';
import { Genders, ActivityLevels } from './user-account.constants';
import { LoginService } from '../login/login.service';
import { UserAccountService } from './user-account.service';

class UserAccountServiceStub { }

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;
  let loginServiceReference: LoginServiceStub;

  const firebaseConfig = {
    apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
    authDomain: 'nuba-c3e84.firebaseapp.com',
    databaseURL: 'https://nuba-c3e84.firebaseio.com/',
    storageBucket: 'nuba-c3e84.appspot.com',
    messagingSenderId: '126418702718'
  };

  beforeAll(() => {

  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ UserAccountComponent ],
      providers: [
        AngularFire,
        FIREBASE_PROVIDERS,
        defaultFirebase(firebaseConfig)
      ]
    }).overrideComponent(UserAccountComponent, {
      set: {
        providers: [
          {provide: LoginService, useClass: LoginServiceStub},
          {provide: UserAccountService, useClass: UserAccountServiceStub}
        ]
      }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;
    loginServiceReference = new LoginServiceStub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load UserAccount', () => {
    expect(loginServiceReference.getUser()).toEqual(component.user);
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
