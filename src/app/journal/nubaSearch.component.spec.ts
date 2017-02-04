import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { EventEmitter } from '@angular/core';

import { SearchComponent } from './nubaSearch.component';
import { FormsModule } from '@angular/forms';
import { FoodService } from '../food/food.service';
import { JournalEntriesService } from './journalEntries.service';
import { Observable, Subject } from 'rxjs';
import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { DebugElement } from '@angular/core';

import { SearchFilterPipe } from './pipes/searchFilter.pipe';

import { Injectable, Output, EventEmitter } from '@angular/core';

const banana: Food = { $key: 1, name: 'Banane', category: 'Frucht', matrix_unit: 'g', matrix_amount: 100 };

class JournalEntriesServiceSpy {
  private addJournalEntrySource = new Subject<JournalEntry>();
  notifyAddJournalEntry = jasmine.createSpy('notifyAddJournalEntry');
  addJournalEntryNotification$ = this.addJournalEntrySource.asObservable();
}

class FoodServiceStub {

  @Output() foodList = new EventEmitter();

  public getFoodList() {
    let foodList: Array<Food> = [banana];
    return foodList;
  }

  public getFood(id: number): Observable<Food> {
    if (id === undefined) {
      return Observable.of(null);
    } else {
      return Observable.of(banana);
    }
  }

}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let debugElement: DebugElement;
  let journalEntriesServiceSpy: JournalEntriesServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, SearchFilterPipe ],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: JournalEntriesService, useClass: JournalEntriesServiceSpy},
        {provide: FoodService, useClass: FoodServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    journalEntriesServiceSpy = debugElement.injector.get(JournalEntriesService);
    fixture.detectChanges();
  });

  it('should create NubaSearchComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  /*
  //noinspection TsLint
  it('should add to form', async(() => {
    component.addToForm(1);
    fixture.detectChanges();
    expect(component.selectedQuantity).toBe(0);
  }));

  it('should not add to form', async(() => {
    // no id passed, therefore no food item can be added
    component.addToForm();
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
    expect(component.selectedQuantity).toBe(0);
  }));
  */

  it('should clear form', () => {
    component.selectedFood = banana;
    component.selectedQuantity = 100;
    fixture.detectChanges();
    component.clearForm();
    fixture.detectChanges();
    expect(component.selectedFood).toEqual(null);
    expect(component.selectedQuantity).toBe(0);
  });

  it('should add entry to journal', async(() => {
    component.selectedFood = banana;
    component.selectedQuantity = 200;
    fixture.detectChanges();

    let expectedJournalEntry: JournalEntry = new JournalEntry();
    expectedJournalEntry.name = banana.name;
    expectedJournalEntry.foodID = banana.$key;
    expectedJournalEntry.quantity = 200;
    expectedJournalEntry.unit = banana.matrix_unit;
    expectedJournalEntry.editable = false;

    spyOn(component, 'resetSearchResults');

    component.addToJournal();
    fixture.detectChanges();

    expect(journalEntriesServiceSpy.notifyAddJournalEntry.calls.count()).toBe(1);
    expect(journalEntriesServiceSpy.notifyAddJournalEntry).toHaveBeenCalledWith(expectedJournalEntry);
    expect(component.resetSearchResults).toHaveBeenCalled();
  }));

  /*
  it('should display search results', async(() => {
    component.updateFilter('abc');
    fixture.detectChanges();
    let lis = debugElement.nativeElement.querySelectorAll('li');
    expect(lis.length).toBe(1);
  }));
  */

  it('should display search form', () => {
    expect(debugElement.nativeElement.querySelector('input.searchbar__form').placeholder).toEqual('Was hast du gegessen?');
  });
 
});
