import {Component, OnInit} from '@angular/core';
import { FoodService } from '../food/food.service';

import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';
import { DateChooserService } from '../shared/date-chooser.service';
import { User } from '../login/user';
import { LoginService } from '../login/login.service';
import { UserAccountService } from '../user-account/user-account.service';

@Component({
  selector: 'app-search',
  templateUrl: './nubaSearch.component.html',
})
export class SearchComponent implements OnInit {

  public foodList: Array<Food>;

  public selectedFood: Food = null;
  public selectedQuantity = 0;

  public searchFilterString = '';

  public foodShortlist: Array<number> = [];
  public foodListActive = false;
  private foodListCanIncrease = true;
  public foodListActiveRow = 0;
  private foodListActiveItemFoodObj: any;

  public user: User;

  constructor(
    private foodService: FoodService,
    public journalEntriesService: JournalEntriesService,
    public loginService: LoginService,
    private dateChooserService: DateChooserService,
    public userAccountService: UserAccountService
  ) { }

  ngOnInit() {
    this.foodList = this.foodService.getFoodList();

    this.foodService.foodList.subscribe((data: any) => {
      this.foodList = data;
    });

    // most used Foods
    this.loginService.getUserAsObservable().subscribe((data: User) => {
      if ( data.foodShortlist ) {
        this.foodShortlist = data.foodShortlist;
      }
      this.user = data;
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
    newEntry.userId = this.user.uid;

    let selectedDate = this.dateChooserService.getChosenDate();
    newEntry.date = selectedDate;

    this.journalEntriesService.addEntry(newEntry);

    this.userAccountService.addMostUsedFoods(this.selectedFood.$key);

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
