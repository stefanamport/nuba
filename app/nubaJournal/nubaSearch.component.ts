// Allgemeine TODO's
// - nice to have - nach klick in Suchfeld Food Vorschläge anzeigen
// - nice to have - gewicht & submit button entfernen, falls noch kein nahrungsmitte eingetragen
// - nice to have - es ist nicht ganz klar, dass keine Freien Texte gespeichert werden können
// - Search Dropdown: Zum food.name weitere Details zum Nahrungsmittel anzeigen

import { Component } from '@angular/core';
import { FoodDatabaseService } from '../foodDatabase/food.service';

import { Food } from '../foodDatabase/food';

@Component({
  selector: "NubaSearch",
  templateUrl: "./app/nubaJournal/nubaSearch.component.html",
  providers: [FoodDatabaseService]
})
export class NubaSearch  { 

  public searchResults: Object;

  //TODO Müsste eigendlich activeFood: Food sein, aber reset funktioniert dann nicht...
  public activeFood: Object;

  constructor(private _FoodDatabaseService: FoodDatabaseService) {

  }

  filterResults (val: string){
  	
  	if (val.length > 0) {
  		this.searchResults = this._FoodDatabaseService.getFoodDB(val);
  	} else {
  		this.resetSearchResults();
  	}

  }

  addToForm(id: number){
  	this.activeFood = this._FoodDatabaseService.getFood(id);
  	this.resetSearchResults();
  }

  resetSearchResults(){
  	this.searchResults = [];
  };

  clearForm(){
  	this.activeFood = [];
  };

  addToJournal (id: number){

  	console.log("add Food Number " + id + " to Journal :-D");

  	this.resetSearchResults();
  	this.clearForm();
  	
  }

}
