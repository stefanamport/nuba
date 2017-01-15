import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

import { UserAccountComponent } from './user-account.component';
import { UserService } from '../login/user.service';
import { UserServiceStub } from '../login/testing/fake.user.service';
import { Genders, ActivityLevels } from '../login/user.specs';

describe('UserAccountComponent', () => {
  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;
  let UserServiceReference: UserServiceStub;

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
          {provide: UserService, useClass: UserServiceStub}
        ]
      }})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;
    UserServiceReference = new UserServiceStub();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load User', () => {
    expect(UserServiceReference.getUser()).toEqual(component.user);
  });

  it('should load genders', () => {
    this.genders = Genders;
    expect(this.genders).toBe(component.genders);
  });

  it('should load activity levels', () => {
    this.activityLevels = ActivityLevels;
    expect(this.activityLevels).toBe(component.activityLevels);
  });
});
