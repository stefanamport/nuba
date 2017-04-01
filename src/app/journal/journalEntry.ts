export class JournalEntry {
  $key: string;
  userId: string;
  id: string;
  name: string;
  date: Date;
  timeProvH?: any;
  timeProvM?: any;
  foodID: number;
  quantity: number;
  unit: string;
  editable: boolean;
}

/*
 * Firebase does not support the data type Date. Therefore, a second class is introduced
 * to avoid that we have to deal everywhere in the application with string dates instead of
 * real dates.
 */
export class JournalEntryFirebase {
  $key: string;
  userId: string;
  id: string;
  name: string;
  date: string;
  foodID: number;
  quantity: number;
  unit: string;
  editable: boolean;
}
