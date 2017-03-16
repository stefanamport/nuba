import { FoodService } from './food.service';
import { Observable } from 'rxjs';
import { FoodMock } from './food.mock';

class FirebaseServiceStub {
  getList(): Observable<any[]> {
    return Observable.of(FoodMock);
  }

  getObject(url, id) {
    return Observable.of(FoodMock[id]);
  }
}

describe('Food service', () => {
  let foodService: any;
  let firebaseService: any = new FirebaseServiceStub();

  beforeEach(() => {
    foodService = new FoodService(firebaseService);
  });

  it('should create firebase service', () => {
    expect(foodService).toBeTruthy();
  });

  it('should filter food', () => {
    let foodResult = foodService.filterFoodId(1);
    expect(foodResult).toEqual(FoodMock[1]);
  });

  it('should not filter food', () => {
    // id 100 does not exist in mock
    let foodResult = foodService.filterFoodId(100);
    expect(foodResult).toEqual(null);
  });

  it('should get food from cache', () => {
    foodService.getFood(1).subscribe((food) => {
      expect(food).toEqual(FoodMock[1]);
    });
  });

  it('should get food from db', () => {
    spyOn(foodService, 'filterFoodId').and.returnValue(null);
    foodService.getFood(1).subscribe((food) => {
      expect(food).toEqual(FoodMock[1]);
    });
  });

  it('should get food list as observable', () => {
    foodService.getFoodListAsObservable().subscribe((foodList) => {
      expect(foodList).toEqual(FoodMock);
    });
  });
});
