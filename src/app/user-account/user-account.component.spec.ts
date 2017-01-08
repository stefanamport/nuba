/* tslint:disable:no-unused-variable */
import { ModuleWithProviders } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

import { UserAccountComponent } from './user-account.component';

// import {Router, ROUTER_PROVIDERS} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { user } from '../login/user';
import { UserService } from '../login/user.service';

import { Genders, ActivityLevels } from '../login/user.specs';

// TODO: Integrate fake User Service instead of real user service
class fakeUserService {

  getUser(){
    let mockUser = {
      name: 'Kurt',
    };
    return mockUser;
  }

  testing(){
    return 'testing';
  }

}

describe('UserAccountComponent', () => {

  let component: UserAccountComponent;
  let fixture: ComponentFixture<UserAccountComponent>;
  let UserService: any;
  let fakeUserService: fakeUserService;
  //let routr: Router; 

  const firebaseConfig = {
    apiKey: 'AIzaSyBf7RiiafbN6IKzYoDdsZtOaQqFK-54oB0',
    authDomain: 'nuba-c3e84.firebaseapp.com',
    databaseURL: 'https://nuba-c3e84.firebaseio.com/',
    storageBucket: 'nuba-c3e84.appspot.com',
    messagingSenderId: '126418702718'
  }

  beforeAll(() => {
        //router = jasmine.createSpyObj('Router', ['navigate']);
        //component = new UserAccountComponent(router);
    });


  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule ],
      declarations: [ UserAccountComponent ],
      providers: [
        {provide: UserService, useValue: fakeUserService },
        AngularFire,
        FIREBASE_PROVIDERS,
        defaultFirebase(firebaseConfig)
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {  
    fixture = TestBed.createComponent(UserAccountComponent);
    component = fixture.componentInstance;

    // Inject Mock User Service
    //UserService = fixture.debugElement.injector.get(UserService);
    //componentUserService = userService;

    // UserService from the root injector
    UserService = TestBed.get(UserService);

    fixture.detectChanges();
  });

 
  it('should create', () => {
    expect(component).toBeTruthy();
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
