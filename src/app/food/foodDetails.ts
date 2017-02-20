import {FoodComponent} from './foodComponent';

export interface FoodDetails {
  category: string;
  matrix_amount: number;
  matrix_unit: string;
  name: string;
  synonyms: string;
  components: FoodComponent[];
}
