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
  public foodListCanIncrease = true;
  public foodListActiveRow = 0;
  public foodListActiveItemFoodObj: Food = null;

  public user: User;

  public searchFilter: any;

  constructor(
    private foodService: FoodService,
    public journalEntriesService: JournalEntriesService,
    public loginService: LoginService,
    private dateChooserService: DateChooserService,
    public userAccountService: UserAccountService
  ) { }

  ngOnInit() {
    this.foodService.getFoodListAsObservable().subscribe((data: Array<Food>) => {
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

    } else if ( event.key === 'ArrowDown' ) {

      this.listSelect(1);

    } else if ( event.key === 'Enter' ) {

      if ( this.foodListActiveItemFoodObj !== null && this.foodListActiveItemFoodObj !== undefined ) {
        this.addToForm(this.foodListActiveItemFoodObj.$key);
      }

    } else {

      // reset listSelect
      this.foodListActiveRow = 0;
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
  isSelectedItem(active: boolean, last: boolean, index: number, item: Food) {

    if (active) {

      // set active item to selected item
      this.foodListActiveItemFoodObj = item;

      // cant increase if it's last item
      this.foodListCanIncrease = !last;

    }

    return active;

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

    let yet = new Date();
    selectedDate.setHours(yet.getHours());
    selectedDate.setMinutes(yet.getMinutes());

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
    this.foodListActiveItemFoodObj = null;
    this.foodListCanIncrease = true;
  }

}
