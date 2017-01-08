export class JournalEntry {
  id: number;
  name: string;
  date: Date;
  foodID: number;
  quantity: number;
  unit: string;
  editable: boolean;
  
  constructor(name: string, date: Date, foodID: number, quanity: number, unit: string, editable: boolean) {
    this.name = name;
    this.date = date;
    this.foodID = foodID;
    this.quantity = quanity;
    this.unit = unit;
    this.editable = editable;
  }
}
