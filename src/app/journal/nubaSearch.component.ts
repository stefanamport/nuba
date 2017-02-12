import { Component } from '@angular/core';
import { FoodService } from '../food/food.service';

import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

import { UserService } from '../login/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './nubaSearch.component.html',
})
export class SearchComponent {

  public foodList: Array<Food>;

  public selectedFood: Food = null;
  public selectedQuantity: number = 0;

  private searchFilterString: string = '';

  private foodShortlist: Array<number> = [];
  public foodListActive: boolean = false;
  private foodListCanIncrease: boolean = true;
  private foodListActiveRow: number = 0;
  private foodListActiveItemFoodObj: any;

  constructor(
    private foodService: FoodService,
    private journalEntriesService: JournalEntriesService,
    private userService: UserService
  ) {

    this.foodList = this.foodService.getFoodList();

    this.foodService.foodList.subscribe((data: any) => {
      this.foodList = data;
    });

    // most used Foods
    this.userService.data.subscribe((data: any) => {
      if ( data.foodShortlist ) {
        this.foodShortlist = data.foodShortlist;
      }
    });

  }

  // List-Navigation with Keyboard
  keyDown (searchFilterString: string, event: any) {

    if ( this.searchFilterString !== searchFilterString ) {

      this.searchFilterString = searchFilterString;

      if ( this.selectedFood ) {
        this.clearForm();
        this.resetSearchResults();
      }

    }

    if ( event.key === 'ArrowUp' ) {
      this.listSelect(-1);
    }
    if ( event.key === 'ArrowDown' ) {
      this.listSelect(1);
    }

    if ( event.key === 'Enter' ) {
      if ( this.foodListActiveItemFoodObj.$key ) {
        this.addToForm(this.foodListActiveItemFoodObj.$key);
      }
    }

  }

  // helper function for arrow navigation
  private listSelect(incdec: number) {
    if (
      incdec === -1 && this.foodListActiveRow >= 1 ||
      incdec === 1 && this.foodListCanIncrease
      ) {

      this.foodListActiveRow = this.foodListActiveRow + incdec;
    }
  }

  // helper function for ngFor List
  isSelectedItem(active: boolean, last: boolean, item: Food) {

    if (active && last) {
      this.foodListCanIncrease = false;
    } else {
      this.foodListCanIncrease = true;
    }

    if (active) {
      this.foodListActiveItemFoodObj = item;
      return true;
    } else {
      return false;
    }

  }

  // add food by id to Add-Form
  addToForm(id: number) {
    this.foodService.getFood(id).subscribe(food => {
      this.selectedFood = food;
      if ( this.selectedFood !== null ) {
        this.selectedQuantity = this.selectedFood.matrix_amount;
      }

      if (document.getElementById('quantity')) {
        document.getElementById('quantity').focus();
      }
      this.resetSearchResults();
    });
  }

  // Add selected Food to NubaJournal
  addToJournal() {
    let newEntry = new JournalEntry();
    newEntry.name = this.selectedFood.name;
    newEntry.foodID = this.selectedFood.$key;
    newEntry.quantity = this.selectedQuantity;
    newEntry.unit = this.selectedFood.matrix_unit;
    newEntry.editable = false;

    this.journalEntriesService.notifyAddJournalEntry(newEntry);

    this.userService.addMostUsedFoods(this.selectedFood.$key);

    this.resetSearchResults();
    this.clearForm();
  }

  // Show / Hide Food list above search Form
  activateFoodlist() {
    this.foodListActive = true;
  }
  deactivateFoodlist() {
    this.foodListActive = false;
  }

    // UI Reset Methods
  resetSearchResults() {
    this.searchFilterString = '';

    this.selectListItemReset();
  };

  clearForm() {
    this.selectedFood = null;
    this.selectedQuantity = 0;

    this.selectListItemReset();
  };

  // selected Food Reset
  selectListItemReset() {
    this.foodListActiveRow = 0;
    this.foodListActiveItemFoodObj = false;
    this.foodListCanIncrease = true;
  }

}
