// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld Food Vorschläge anzeigen
// - nice to have - gewicht & submit button entfernen, falls noch kein nahrungsmitte eingetragen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import { Component } from '@angular/core';
import { FoodDatabaseService } from '../foodDatabase/food.service';

import { Food } from '../foodDatabase/food';

import { journalEntry } from './journalEntry';
import { JournalEntriesService } from './journalEntries.service';


@Component({
  selector: "NubaSearch",
  templateUrl: "./app/nubaJournal/nubaSearch.component.html",
  providers: [FoodDatabaseService, JournalEntriesService]
})
export class NubaSearch  { 

  public searchResults: Object;

  //TODO Müsste eigendlich activeFood: Food sein, aber reset funktioniert dann nicht...
  public activeFood: Object;

  constructor(private _FoodDatabaseService: FoodDatabaseService, private JournalEntriesService: JournalEntriesService) {

  }

  filterResults (val: string){
  	
  	if (val.length > 0) {
  		this.searchResults = this._FoodDatabaseService.getFoodDB(val);
  	} else {
  		this.resetSearchResults();
  	}

  }

  addToForm (id: number){
  	this.activeFood = this._FoodDatabaseService.getFood(id);
  	this.resetSearchResults();
  }

  resetSearchResults(){
  	this.searchResults = [];
  };

  clearForm(){
  	this.activeFood = [];
  };

  addToJournal (id: number, quantity: number){

  	console.log("add Food Number " + id + " to Journal :-D");

    let newEntry = new journalEntry;

    newEntry.id = 3;
    newEntry.date = "mock-Date :-)";
    newEntry.foodID = id;
    newEntry.quantity = quantity;

    this.JournalEntriesService.addEntry(newEntry);

    console.log(newEntry);

  	this.resetSearchResults();
  	this.clearForm();
  	
  }

}
