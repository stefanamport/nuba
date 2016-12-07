import { Component } from '@angular/core';

@Component({
  selector: "NubaSearch",
  templateUrl: "./app/nubaJournal/nubaSearch.component.html"
})
export class NubaSearch  { 

	searchResults: Object;

	// dummy list

	foodDatabase = [
      { "id": 11, "food": "Broccoli", "quant": "100", "measure": "g"},
      { "id": 12, "food": "Brot", "quant": "100", "measure": "g" },
      { "id": 13, "food": "Erbsen", "quant": "100", "measure": "g" },
      { "id": 14, "food": "Poulet", "quant": "100", "measure": "g" },
      { "id": 15, "food": "Butter", "quant": "100", "measure": "g" },
      { "id": 16, "food": "Magerquark", "quant": "100", "measure": "g" },
      { "id": 17, "food": "Salat", "quant": "100", "measure": "g" },
      { "id": 18, "food": "Schoggi", "quant": "100", "measure": "g" },
      { "id": 19, "food": "Hot Dog", "quant": "100", "measure": "g" },
      { "id": 20, "food": "Kaugumi", "quant": "100", "measure": "g" }
  ]

  filterResults (val: string){
  	//console.log(value);

  	let results = this.foodDatabase.filter(function(item){ 
	   return item.food.toLowerCase().indexOf(val.toLowerCase()) > -1;
	 });

  	this.searchResults = results;

  }
}
