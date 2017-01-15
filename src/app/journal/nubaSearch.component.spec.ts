import {ComponentFixture, TestBed, async} from '@angular/core/testing';

import {SearchComponent} from './nubaSearch.component';
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
  addEntry = jasmine.createSpy('addEntry').and.callFake(
    (entry: JournalEntry) => Promise
      .resolve(true)
      .then(() => Object.assign(this.getNewEntry(), entry))
  );

  getNewEntry(): JournalEntry {
    let newEntry: JournalEntry = new JournalEntry();
    newEntry.date = date;
    newEntry.editable = true;
    newEntry.foodID = 1;
    newEntry.id = 1;
    newEntry.name = 'Banana';
    newEntry.quantity = 200;
    newEntry.unit = 'g';

    return newEntry;
  }
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

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let debugElement: DebugElement;
  let journalEntriesServiceSpy: JournalEntriesServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [
        FormsModule
      ],
      providers: [
        {provide: FirebaseService, useClass: FirebaseServiceStub},
        {provide: JournalEntriesService, useClass: JournalEntriesServiceSpy}
      ]
    }).overrideComponent(SearchComponent, {
      set: {
        providers: [
          {provide: FoodDatabaseService, useClass: FoodDatabaseServiceStub}
        ]
      }})
      .compileComponents();
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

  it('should filter results', async(() => {
    debugElement.componentInstance.filterResults('abc');
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(1);
    expect(component.searchResults[0]).toEqual(banana);
  }));

  it('should not filter results', async(() => {
    fixture.debugElement.componentInstance.filterResults('ab');
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
  }));

  //noinspection TsLint
  it('should add to form', async(() => {
    component.addToForm(1);
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
    expect(component.selectedQuantity).toBe(100);
  }));

  it('should not add to form', async(() => {
    // no id passed, therefore no food item can be added
    component.addToForm();
    fixture.detectChanges();
    expect(component.searchResults.length).toBe(0);
    expect(component.selectedQuantity).toBe(0);
  }));

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

    let expectedJournalEntry = journalEntriesServiceSpy.getNewEntry();

    spyOn(component, 'resetSearchResults');

    component.addToJournal();
    fixture.detectChanges();

    expect(journalEntriesServiceSpy.addEntry.calls.count()).toBe(1);

    /*
     * FIXME: sonja, 08.01.2017, test is currently not successful because I don't know how I can mock the new Date()
     * in the addEntry() function
     * expect(journalEntriesServiceSpy.addEntry).toHaveBeenCalledWith(expectedJournalEntry);
     */
    expect(component.resetSearchResults).toHaveBeenCalled();
  }));

  it('should display search results', async(() => {
    component.filterResults('abc');
    fixture.detectChanges();
    let lis = debugElement.nativeElement.querySelectorAll('li');
    expect(lis.length).toBe(1);
  }));

  it('should display search form', () => {
    expect(debugElement.nativeElement.querySelector('input#food').placeholder).toEqual('Was hast du gegessen?');
  });
});
