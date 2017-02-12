import { ComponentFixture, TestBed, async } from '@angular/core/testing';

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

import { UserService } from '../login/user.service';

const banana: Food = { $key: 1, name: 'Banane', category: 'Frucht', matrix_unit: 'g', matrix_amount: 100 };

class JournalEntriesServiceSpy {
  private addJournalEntrySource = new Subject<JournalEntry>();
  notifyAddJournalEntry = jasmine.createSpy('notifyAddJournalEntry');
  addJournalEntryNotification$ = this.addJournalEntrySource.asObservable();
}

class UserServiceStub {

  @Output() data = new EventEmitter();

  addMostUsedFoods = jasmine.createSpy('addMostUsedFoods');

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
  let foodService: FoodService;
  let userService: UserService;
  let journalEntriesService: JournalEntriesService;

  beforeEach(() => {
    foodService = new FoodServiceStub();
    userService = new UserServiceStub();
    journalEntriesService = new JournalEntriesServiceSpy();

    component = new SearchComponent(
        foodService,
        journalEntriesService,
        userService);
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

    let expectedJournalEntry: JournalEntry = new JournalEntry();
    expectedJournalEntry.name = banana.name;
    expectedJournalEntry.foodID = banana.$key;
    expectedJournalEntry.quantity = 200;
    expectedJournalEntry.unit = banana.matrix_unit;
    expectedJournalEntry.editable = false;

    spyOn(component, 'resetSearchResults');
    spyOn(component, 'clearForm');

    // act
    component.addToJournal();

    // assert
    expect(component.journalEntriesService.notifyAddJournalEntry).toHaveBeenCalledWith(expectedJournalEntry);
    expect(component.userService.addMostUsedFoods).toHaveBeenCalledWith(expectedJournalEntry.foodID);

    expect(component.resetSearchResults).toHaveBeenCalled();
    expect(component.clearForm).toHaveBeenCalled();
  }));

});
