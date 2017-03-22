import { FoodDetails } from '../../food/foodDetails';
import { FoodComponent } from '../../food/foodComponent';

export class FoodDetailsMock {
  public static getFoodDetails() {
    let foodDetails = new FoodDetails();
    foodDetails.category = 'Süssigkeiten';
    foodDetails.matrix_amount = 100;
    foodDetails.matrix_unit = 'mg/d';
    foodDetails.name = 'Test Food';
    foodDetails.synonyms = 'Test';
    foodDetails.components = [];

    let testComponents = this.getTestComponents();

    for (let component of testComponents) {
      let foodComponent = new FoodComponent();
      foodComponent.name = component.name;
      foodComponent.amount = parseFloat(component.amount);
      foodComponent.unit = component.unit;
      foodDetails.components.push(foodComponent);
    }

    return foodDetails;
  }

  // extract from the firebase database
  static getTestComponents() {
    return [{'name': 'Energie kJ', 'amount': '1250', 'unit': 'kJ'}, {
      'name': 'Energie kcal',
      'amount': '295',
      'unit': 'kcal'
    }, {'name': 'Protein', 'amount': '0.2', 'unit': 'g'}, {
      'name': 'Alkohol',
      'amount': '',
      'unit': ''
    }, {'name': 'Wasser', 'amount': '', 'unit': ''}, {
      'name': 'Kohlenhydrate',
      'amount': '73',
      'unit': 'g'
    }, {'name': 'Stärke', 'amount': '', 'unit': ''}, {
      'name': 'Zucker',
      'amount': '',
      'unit': ''
    }, {'name': 'Ballaststoffe', 'amount': '0', 'unit': 'g'}, {
      'name': 'Fett',
      'amount': '0',
      'unit': 'g'
    }, {'name': 'Cholesterin', 'amount': '', 'unit': ''}, {
      'name': 'Einfache ungesättigte Fettsäuren',
      'amount': '',
      'unit': ''
    }, {'name': 'Gesättigte Fettsäuren', 'amount': '', 'unit': ''}, {
      'name': 'Mehrfach ungesättigte Fettsäuren',
      'amount': '',
      'unit': ''
    }, {'name': 'Vitamin A', 'amount': '', 'unit': ''}, {
      'name': 'all-trans retinol equivalents',
      'amount': '',
      'unit': ''
    }, {'name': 'beta-carotene activity', 'amount': '', 'unit': ''}, {
      'name': 'beta-carotene',
      'amount': '',
      'unit': ''
    }, {'name': 'Vitamin B1', 'amount': '', 'unit': ''}, {
      'name': 'Vitamin B2',
      'amount': '',
      'unit': ''
    }, {'name': 'Vitamin B6', 'amount': '', 'unit': ''}, {
      'name': 'Vitamin B12',
      'amount': '',
      'unit': ''
    }, {'name': 'Niacin', 'amount': '', 'unit': ''}, {
      'name': 'Folat',
      'amount': '',
      'unit': ''
    }, {'name': 'Pantothensäure', 'amount': '', 'unit': ''}, {
      'name': 'Vitamin C',
      'amount': '',
      'unit': ''
    }, {'name': 'Vitamin D', 'amount': '', 'unit': ''}, {
      'name': 'Vitamin E',
      'amount': '',
      'unit': ''
    }, {'name': 'Natrium', 'amount': '', 'unit': ''}, {'name': 'Kalium', 'amount': '', 'unit': ''}, {
      'name': 'Chlorid',
      'amount': '',
      'unit': ''
    }, {'name': 'Kalzium', 'amount': '', 'unit': ''}, {
      'name': 'Magnesium',
      'amount': '',
      'unit': ''
    }, {'name': 'Phosphor', 'amount': '', 'unit': ''}, {'name': 'Eisen', 'amount': '', 'unit': ''}, {
      'name': 'Jodid',
      'amount': '',
      'unit': ''
    }, {'name': 'Zink', 'amount': '', 'unit': ''}];
  }
}
