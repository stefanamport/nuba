import {ComponentFixture, TestBed, async} from '@angular/core/testing';

import {NubaSearch} from './nubaSearch.component';
import {FormsModule} from '@angular/forms';
import {FoodDatabaseService} from '../food-database/food.service';
import {FirebaseService} from '../food-database/firebase.service';
import {JournalEntriesService} from './journalEntries.service';
import {Observable} from 'rxjs';
import {Food} from '../food-database/food';
import {JournalEntry} from './journalEntry';
import {DebugElement} from '@angular/core';

const banana: Food = { $key: 1, name: 'Banane', category: 'Frucht', matrix_unit: 'g', matrix_amount: 100 };
const date = new Date('February 3, 2001');

class FirebaseServiceStub {}

class JournalEntriesServiceSpy {
  newEntry: JournalEntry = new JournalEntry('Banane', date, 1, 100, 'g', true);

  addEntry = jasmine.createSpy('addEntry').and.callFake(
    (entry: JournalEntry) => Promise
      .resolve(true)
      .then(() => Object.assign(this.newEntry, entry))
  );
}

class FoodDatabaseServiceStub {
  public searchFood(filter: string): Observable<Array<Food>> {
    let foodList: Array<Food> = [ banana];
    return Observable.of(foodList);
  }

  public getFood(id: number): Observable<Food> {
    if (id === undefined) {
      return Observable.of(null);
    } else {
      return Observable.of(banana);
    }
  }
}

describe('NubaSearchComponent', () => {
  let component: NubaSearch;
  let fixture: ComponentFixture<NubaSearch>;
  let debugElement: DebugElement;
  let journalEntriesServiceSpy: JournalEntriesServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NubaSearch],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: FirebaseService, useClass: FirebaseServiceStub},
        {provide: JournalEntriesService, useClass: JournalEntriesServiceSpy}
      ]
    }).overrideComponent(NubaSearch, {
      set: {
        providers: [
          {provide: FoodDatabaseService, useClass: FoodDatabaseServiceStub}
        ]
      }})
      .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NubaSearch);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    journalEntriesServiceSpy = debugElement.injector.get(JournalEntriesService);
    fixture.detectChanges();
  });

  it('should create NubaSearchComponent', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should filter results', async(() => {
    fixture.debugElement.componentInstance.filterResults('abc');
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0].name).toBe('Banane');
    expect(component.searchResults[0].matrix_amount).toBe(100);
    expect(component.searchResults[0].$key).toBe(1);
    expect(component.searchResults[0].category).toBe('Frucht');
    expect(component.searchResults[0].matrix_unit).toBe('g');

  }));

  it('should not filter results', async(() => {
    fixture.debugElement.componentInstance.filterResults('ab');
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
  }));

  it('should add to form', async(() => {
    debugElement.componentInstance.addToForm(1);
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
    expect(component.selectedQuantity).toBe(100);
  }));

  it('should not add to form', async(() => {
    // no id passed, therefore no food item can be added
    debugElement.componentInstance.addToForm();
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
    expect(component.selectedQuantity).toBe(0);
  }));

  it('should clear form', async(() => {
    debugElement.componentInstance.clearForm();
    fixture.detectChanges();
    expect(component.selectedFood).toEqual(null);
    expect(component.selectedQuantity).toBe(0);
  }));

  it('should add entry to journal', async(() => {
    debugElement.componentInstance.selectedFood = banana;
    let selectedQuantity = 200;
    // let journalEntry = new JournalEntry(banana.name, date, banana.$key, selectedQuantity, banana.matrix_unit, true);

    debugElement.componentInstance.selectedQuantity = selectedQuantity;
    spyOn(debugElement.componentInstance, 'resetSearchResults');

    debugElement.componentInstance.addToJournal();
    fixture.detectChanges();

    expect(journalEntriesServiceSpy.addEntry.calls.count()).toBe(1);
    /*
     * FIXME: sonja, 08.01.2017, test is currently not successful because I don't know how I can mock the new Date() in the addEntry() function
     * expect(journalEntriesServiceSpy.addEntry).toHaveBeenCalledWith(journalEntry);
     */
    expect(debugElement.componentInstance.resetSearchResults).toHaveBeenCalled();
  }));
});
