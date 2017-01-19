// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import {Component, OnInit} from '@angular/core';
import { FoodService } from '../food/food.service';

import { Food } from '../food/food';
import { JournalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';
import { FirebaseService } from '../firebase/firebase.service';
import {UserService} from '../login/user.service';
import {User} from '../login/user';

@Component({
  selector: 'app-search',
  templateUrl: './nubaSearch.component.html',
  providers: [FoodService, FirebaseService]
})
export class SearchComponent implements OnInit {

  public searchResults: Array<Food> = [];
  public selectedFood: Food = null;
  public selectedQuantity: number = 0;
  private user: User;

  constructor(
    private FoodService: FoodService,
    private JournalEntriesService: JournalEntriesService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.user = this.UserService.getUser();
  }

  filterResults (val: string) {
    if (val.length > 2) {
      this.FoodService.searchFood(val).subscribe(food => this.searchResults = food);
    } else if (val.length === 0) {
      this.resetSearchResults();
    }

    if (this.selectedFood && this.selectedFood.name !== val) {
      this.selectedFood.name = val;
    }
  }

  addToForm(id: number) {
    this.FoodService.getFood(id).subscribe(food => {
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
    newEntry.userId = this.user.uid;
    newEntry.name = this.selectedFood.name;
    newEntry.date = new Date();
    newEntry.foodID = this.selectedFood.$key;
    newEntry.quantity = this.selectedQuantity;
    newEntry.unit = this.selectedFood.matrix_unit;
    newEntry.editable = false;

    this.JournalEntriesService.addEntry(newEntry);

    this.resetSearchResults();
    this.clearForm();
  }
}
