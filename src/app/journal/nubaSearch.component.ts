// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import { Component } from '@angular/core';
import { FoodDatabaseService } from '../food-database/food.service';

import { Food } from '../food-database/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';

@Component({
  selector: 'nuba-search',
  templateUrl: './nubaSearch.component.html',
  providers: [FoodDatabaseService]
})
export class NubaSearch  {

  public searchResults: Array<Food> = [];
  public selectedFood: Food = null;
  public selectedQuantity: number = 0;

  constructor(
    private FoodDatabaseService: FoodDatabaseService,
    private JournalEntriesService: JournalEntriesService) {
  }

  filterResults (val: string) {
    if (val.length > 2) {
      this.FoodDatabaseService.searchFood(val).subscribe(food => this.searchResults = food);
    } else if (val.length === 0) {
      this.resetSearchResults();
    }

    if (this.selectedFood && this.selectedFood.name !== val) {
      this.selectedFood.name = val;
    }
  }

  addToForm(id: number) {
    this.FoodDatabaseService.getFood(id).subscribe(food => {
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

  addToJournal (value: any) {
    let newEntry = new JournalEntry(this.selectedFood.name, new Date(), this.selectedFood.$key,  this.selectedQuantity,
                                      this.selectedFood.matrix_unit, true);
    this.JournalEntriesService.addEntry(newEntry);

    this.resetSearchResults();
    this.clearForm();
  }
}
