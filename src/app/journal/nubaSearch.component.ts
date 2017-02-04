// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import { Component } from '@angular/core';
import { FoodService } from '../food/food.service';

import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

@Component({
  selector: 'app-search',
  templateUrl: './nubaSearch.component.html',
})
export class SearchComponent {

  public foodList: Array<Food> = [];

  public selectedFood: Food = null;
  public selectedQuantity: number = 0;

  private searchFilterString: string = '';

  constructor(
    private foodService: FoodService,
    private journalEntriesService: JournalEntriesService
  ) {

    this.foodService.getAllFoods().subscribe(food => this.foodList = food);

  }

  updateFilter (searchFilterString: string) {
    this.searchFilterString = searchFilterString;
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

    this.resetSearchResults();
    this.clearForm();
  }
}
