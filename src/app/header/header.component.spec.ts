/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {DebugElement, EventEmitter} from '@angular/core';

import {Router, ROUTER_PROVIDERS} from '@angular/router';

import { UserService } from '../login/user.service';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire} from 'angularfire2';

import { HeaderComponent } from './header.component';
import {UserAccountComponent} from "../user-account/user-account.component";
import {Output} from "@angular/core/src/metadata/directives";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  
  class AngularFireStub {}
  
  class UserServiceStub implements UserService {
    @Output() data = new EventEmitter();
    
    public getUser() {}
  }

  // FIXME: @Stefan: I commented this out as it did not work and I don't fully understand it.
  // I think assigning a UserAccountComponent to a component of type HeaderComponent does not work.
  //beforeAll(() => {
      //router = jasmine.createSpyObj('Router', ['navigate']);
      //component = new UserAccountComponent(router);
 // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AngularFire, useClass: AngularFireStub },
      ]
    }).overrideComponent(HeaderComponent, {
      set: {
        providers: [
          { provide: UserService, useClass: UserServiceStub }
        ]
      }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
