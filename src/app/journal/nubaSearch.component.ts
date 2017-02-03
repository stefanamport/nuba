// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import {Component } from '@angular/core';
import { FoodService } from '../food/food.service';

import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

@Component({
  selector: 'app-search',
  templateUrl: './nubaSearch.component.html',
})
export class SearchComponent {
  public searchResults: Array<Food> = [];
  public selectedFood: Food = null;
  public selectedQuantity: number = 0;

  constructor(
    private foodService: FoodService,
    private journalEntriesService: JournalEntriesService
  ) { }

  filterResults (val: string) {
    console.log();
    if (val.length > 2) {
      this.foodService.searchFood(val).subscribe(food => this.searchResults = food);
    } else if (val.length === 0) {
      this.resetSearchResults();
    }

    if (this.selectedFood && this.selectedFood.name !== val) {
      this.selectedFood.name = val;
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
    this.searchResults = [];
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
