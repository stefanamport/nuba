/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent} from "./header/header.component";
import { NubaSearch } from "./journal/nubaSearch.component";
import {JournalComponent} from "./journal/journal.component";
import {JournalList} from "./journal/journalList.component";
import {FormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        NubaSearch,
        JournalComponent,
        JournalList
      ],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    });
    TestBed.compileComponents();
  });
  
  it('should create AppComponent', async(() => {
      let fixture = TestBed.createComponent(AppComponent);
      let app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h1 tag', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('app works!');
  }));
});
