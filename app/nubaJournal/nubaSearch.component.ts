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
  selector: "nuba-search",
  templateUrl: "./app/nubaJournal/nubaSearch.component.html",
  providers: [FoodDatabaseService]
})
export class NubaSearch  { 

  public searchResults: Object;

  //TODO Müsste eigendlich activeFood: Food sein, aber reset funktioniert dann nicht...
  public activeFood: any;
  public activeQuantity: any;

  constructor(
    private FoodDatabaseService: FoodDatabaseService,
    private JournalEntriesService: JournalEntriesService) {
      this.activeFood = false;
  }

  filterResults (val: string){
  	
  	if (val.length > 0) {
  		this.searchResults = this.FoodDatabaseService.getFoodDB(val);
  	} else {
  		this.resetSearchResults();
  	}

  }

  addToForm (id: number){

  	this.activeFood = this.FoodDatabaseService.getFood(id);

    if (!this.activeQuantity) {
      this.activeQuantity = this.activeFood.quantityProposal;
    }

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
