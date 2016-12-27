// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld "most used" Food Vorschläge anzeigen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Suchfeld Vorschläge: mit Pfeiltasten navigierbar machen
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import { Component } from '@angular/core';
import { FoodDatabaseService } from '../foodDatabase/food.service';

import { Food } from '../foodDatabase/food';
import {FirebaseService} from "../foodDatabase/firebase.service";

import { journalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';


@Component({
  selector: "nuba-search",
  templateUrl: "./app/nubaJournal/nubaSearch.component.html",
  providers: [FoodDatabaseService, FirebaseService]
})
export class NubaSearch  {

  public searchResults: Object;

  //TODO Müsste eigendlich activeFood: Food sein, aber reset funktioniert dann nicht...
  public activeFood: any;
  public activeQuantity: any;

  constructor(
    private FoodDatabaseService: FoodDatabaseService,
    private JournalEntriesService: JournalEntriesService,
    private FirebaseService: FirebaseService) {
      this.activeFood = false;
  }

  filterResults (val: string){

  	if (val.length > 0) {
  		this.searchResults = this.FoodDatabaseService.getFoodDB(val);
  	} else {
  		this.resetSearchResults();
  	}

    if (this.activeFood && this.activeFood.name != val) {
      this.activeFood = {};
      this.activeFood.name = val;
    }

  }

  addToForm (id: number){
    this.FirebaseService.getFood(id);
  	this.activeFood = this.FoodDatabaseService.getFood(id);

    if (!this.activeQuantity) {
      this.activeQuantity = this.activeFood.quantityProposal;
    }

    document.getElementById("quantity").focus();

  	this.resetSearchResults();
  }

  resetSearchResults(){
  	this.searchResults = [];
  };

  clearForm(){
  	this.activeFood = false;
    this.activeQuantity = false;
  };

  addToJournal (value: any){

    let newEntry = new journalEntry;

    newEntry.date =  new Date();

    newEntry.foodID = this.activeFood.id;
    newEntry.quantity = this.activeQuantity;

    this.JournalEntriesService.addEntry(newEntry);

  	this.resetSearchResults();
  	this.clearForm();

  }

}