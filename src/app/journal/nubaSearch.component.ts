// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

// - nice loading animations
// - tests :-/

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
      if (data.foodShortlist){
        this.foodShortlist = data.foodShortlist;
      }
    });

  }

  updateFilter (searchFilterString: string) {
    this.searchFilterString = searchFilterString;

    if (this.selectedFood) {
      this.clearForm();
      this.resetSearchResults();
    }

  }

  addToForm(id: number) {
    this.foodService.getFood(id).subscribe(food => {
      this.selectedFood = food;
      if (this.selectedFood !== null) {
        this.selectedQuantity = this.selectedFood.matrix_amount;
      }

      document.getElementById('quantity').focus();
      this.resetSearchResults();
    });
  }

  resetSearchResults() {
    this.searchFilterString = '';
  };

  clearForm() {
    this.selectedFood = null;
    this.selectedQuantity = 0;
  };

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
}
