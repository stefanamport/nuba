import { async } from '@angular/core/testing';
import { SearchComponent } from './nubaSearch.component';
import { Observable, Subject } from 'rxjs';
import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { Output, EventEmitter } from '@angular/core';
import { User } from '../login/user';
import { LoginServiceStub } from '../login/testing/fake.user.service';

const banana: Food = { $key: 1, name: 'Banane', category: 'Frucht', matrix_unit: 'g', matrix_amount: 100 };

class JournalEntriesServiceSpy {
  addEntry = jasmine.createSpy('addEntry');
}

class DateChooserServiceStub {
  public getChosenDate() {
    return new Date('January 10, 2017 00:00:00');
  }
}

class UserAccountServiceStub {
  addMostUsedFoods = jasmine.createSpy('addMostUsedFoods');

  public addMostUsedFoods(foodID: number) { }

  public getFoodList() {
    let foodShortlist: Array<number> = [1, 2, 3, 4];
    return foodShortlist;
  };

}

class FoodServiceStub {

  @Output() foodList = new EventEmitter();

  constructor() {
    this.cachedFoodList = [banana];
  }

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
  let foodService: FoodServiceStub;
  let loginService: LoginServiceStub;
  let journalEntriesService: JournalEntriesServiceSpy;
  let dateChooserService: DateChooserServiceStub;
  let userAccountService: UserAccountServiceStub;

  beforeEach(() => {
    foodService = new FoodServiceStub();
    loginService = new LoginServiceStub();
    journalEntriesService = new JournalEntriesServiceSpy();
    dateChooserService = new DateChooserServiceStub();
    userAccountService = new UserAccountServiceStub();

    component = new SearchComponent(
        foodService,
        journalEntriesService,
        loginService,
        dateChooserService,
        userAccountService
    );
  });

  it('should create NubaSearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should add to Form', () => {

    spyOn(component, 'resetSearchResults');

    component.addToForm(1);

    expect(component.selectedFood).toBe(banana);
    expect(component.selectedQuantity).toBe(banana.matrix_amount);
    expect(component.resetSearchResults).toHaveBeenCalled();
  });

  it('should not add to form', async(() => {

    spyOn(component, 'resetSearchResults');

    // no id passed, therefore no food item can be added
    component.addToForm();

    expect(component.selectedFood).toBeFalsy();
    expect(component.selectedQuantity).toBe(0);
  }));

  it('should clear form', () => {
    component.selectedFood = banana;
    component.selectedQuantity = 300;
    component.clearForm();
    expect(component.selectedFood).toEqual(null);
    expect(component.selectedQuantity).toBe(0);
  });

  it('should add entry to journal', async(() => {
    // arrange
    component.selectedFood = banana;
    component.selectedQuantity = 200;
    let user = new User();
    user.uid = 'user1';
    component.user = user;

    let expectedJournalEntry: JournalEntry = new JournalEntry();
    expectedJournalEntry.name = banana.name;
    expectedJournalEntry.foodID = banana.$key;
    expectedJournalEntry.quantity = 200;
    expectedJournalEntry.unit = banana.matrix_unit;
    expectedJournalEntry.editable = false;
    expectedJournalEntry.userId = 'user1';
    expectedJournalEntry.date = new Date('January 10, 2017 00:00:00');

    spyOn(component, 'resetSearchResults');
    spyOn(component, 'clearForm');

    // act
    component.addToJournal();

    // assert
    expect(component.journalEntriesService.addEntry).toHaveBeenCalledWith(expectedJournalEntry);
    expect(component.userAccountService.addMostUsedFoods).toHaveBeenCalledWith(expectedJournalEntry.foodID);

    expect(component.resetSearchResults).toHaveBeenCalled();
    expect(component.clearForm).toHaveBeenCalled();
  }));

});
