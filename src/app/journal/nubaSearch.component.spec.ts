/* tslint:disable:no-unused-variable */
import { async } from '@angular/core/testing';
import { SearchComponent } from './nubaSearch.component';
import { Observable } from 'rxjs';
import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { User } from '../login/user';
import { LoginServiceStub } from '../login/testing/fake.user.service';
import any = jasmine.any;

const banana: Food = { $key: 1, name: 'Banane', category: 'Frucht', matrix_unit: 'g', matrix_amount: 100 };

class JournalEntriesServiceSpy {
  addEntry = jasmine.createSpy('addEntry');
}

class DateChooserServiceStub {
  getChosenDate() {
    return new Date('January 10, 2017 00:00:00');
  }
}

class UserAccountServiceStub {
  addMostUsedFoods(foodID: number) { }

  getFoodList() {
    return [1, 2, 3, 4];
  };
}

class FoodServiceStub {
  private cachedFoodList: Array<Food> = [];

  constructor() {
    this.cachedFoodList = [banana];
  }

  getFood(id: number): Observable<Food> {
    if (id === undefined) {
      return Observable.of(null);
    } else {
      return Observable.of(banana);
    }
  }

  getFoodListAsObservable() {
    return Observable.of([banana]);
  }
}

describe('SearchComponent', () => {
  let component: SearchComponent;
  let foodService: any;
  let loginService: any;
  let journalEntriesService: any;
  let dateChooserService: any;
  let userAccountService: any;

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

    component.ngOnInit();
  });

  it('should create NubaSearchComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should select item in food list - key up', () => {
    component.foodListActiveRow = 1;

    let event = { 'key': 'ArrowUp' };
    component.keyDown('', event);

    expect(component.foodListActiveRow).toBe(0);
  });

  it('should not select item in food list - key up, top item selected', () => {
    component.foodListActiveRow = 0;

    let event =  { 'key': 'ArrowUp' };
    component.keyDown('', event);

    expect(component.foodListActiveRow).toBe(0);
  });

  it('should select item in food list - key down', () => {
    component.foodListActiveRow = 1;
    component.foodListCanIncrease = true;

    let event = { 'key': 'ArrowDown'};
    component.keyDown('', event);

    expect(component.foodListActiveRow).toBe(2);
  });

  it('should select item in food list - key down,  bottom item selected', () => {
    component.foodListActiveRow = 4;
    component.foodListCanIncrease = false;

    let event = { 'key': 'ArrowDown'};
    component.keyDown('', event);

    expect(component.foodListActiveRow).toBe(4);
  });

  it('should set search filter string', () => {
    component.searchFilterString = 'Salat';

    let event = { 'key': 'ArrowDown'};
    component.keyDown('Brot', event);

    expect(component.searchFilterString).toEqual('Brot');
  });

  it('should add item to journal list form', () => {
    let event = { 'key': 'Enter'};
    component.foodListActiveItemFoodObj = banana;
    spyOn(component, 'addToForm');

    component.keyDown('', event);

    expect(component.addToForm).toHaveBeenCalledWith(banana.$key);
  });

  it('should check if item selected - not active, not last', () => {
    let active = false;
    let last = false;
    let index = 5;
    let food = banana;

    let isSelected = component.isSelectedItem(active, last, index, food);

    expect(isSelected).toBe(false);
    expect(component.foodListCanIncrease).toBe(true);
  });

  it('should check if item selected - active, not last', () => {
    let active = true;
    let last = false;
    let index = 5;
    let food = banana;

    let isSelected = component.isSelectedItem(active, last, index, food);

    expect(isSelected).toBe(true);
    expect(component.foodListCanIncrease).toBe(true);
    expect(component.foodListActiveItemFoodObj).toEqual(banana);
  });

  it('should check if item selected - active, last', () => {
    let active = true;
    let last = true;
    let index = 5;
    let food = banana;

    let isSelected = component.isSelectedItem(active, last, index, food);

    expect(isSelected).toBe(true);
    expect(component.foodListCanIncrease).toBe(false);
    expect(component.foodListActiveItemFoodObj).toEqual(banana);
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

    // no valid id passed, therefore no food item can be added
    component.addToForm(undefined);

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

    let yet = new Date();
    expectedJournalEntry.date.setHours(yet.getHours());
    expectedJournalEntry.date.setMinutes(yet.getMinutes());

    spyOn(component, 'resetSearchResults');
    spyOn(component, 'clearForm');
    spyOn(component.userAccountService, 'addMostUsedFoods');

    // act
    component.addToJournal();

    // assert
    expect(component.journalEntriesService.addEntry).toHaveBeenCalledWith(expectedJournalEntry);
    expect(component.userAccountService.addMostUsedFoods).toHaveBeenCalledWith(expectedJournalEntry.foodID);

    expect(component.resetSearchResults).toHaveBeenCalled();
    expect(component.clearForm).toHaveBeenCalled();
  }));

  it('should activate food list', () => {
    component.foodListActive = false;

    component.activateFoodlist();

    expect(component.foodListActive).toBeTruthy();
  });

  it('should deactivate food list', () => {
    component.foodListActive = true;

    component.deactivateFoodlist();

    expect(component.foodListActive).toBeFalsy();
  });

  it('should reset search results', () => {
    component.searchFilterString = 'Brot';
    component.foodListActiveRow = 3;
    component.foodListActiveItemFoodObj = banana;
    component.foodListCanIncrease = false;

    component.resetSearchResults();

    expect(component.searchFilterString).toEqual('');
    expect(component.foodListActiveRow).toBe(0);
    expect(component.foodListActiveItemFoodObj).toBeNull();
    expect(component.foodListCanIncrease).toBeTruthy();
  });

});
