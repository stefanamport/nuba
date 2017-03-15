import { UserAccountService } from './user-account.service';
import { User } from '../login/user';
import { Observable } from 'rxjs';

class FirebaseServiceStub {
  updateItem(url, id, user) { }
}

class LoginServiceStub {
  getUser() {
    let user = new User();
    user.name = 'Hans';
    user.birthday = '1990-03-15';
    user.activityLevel = 1;
    user.bodyheight = 170;
    user.bodyweight = 65;
    user.hoursOfSport = 3;
    user.gender = 'male';

    return user;
  }

  getUserAsObservable() {
    return Observable.of(this.getUser());
  }
}

describe('UserAccountService', () => {
  let service: UserAccountService;
  let firebaseService: any = new FirebaseServiceStub();
  let loginService: any = new LoginServiceStub();

  beforeEach(() => {
    service = new UserAccountService(firebaseService, loginService);
  });

  it('should create UserAccountService', () => {
    expect(service).toBeTruthy();
  });

  it('should update user info', () => {
    let user = loginService.getUser();
    service.updateUserInfo(user);

    expect(22.5).toEqual(service.user.bmi);
    expect(27).toEqual(service.user.age);
    expect(1869).toEqual(service.user.metabolicRate);
  });

  it('should add most used food item', () => {
    expect(service.user.foodShortlist).toBe(undefined);
    service.addMostUsedFoods(1);
    expect(service.user.foodShortlist.length).toBe(1);
  });

  it('should not add most used food item', () => {
    expect(service.user.foodShortlist).toBe(undefined);
    service.addMostUsedFoods(1);
    expect(service.user.foodShortlist.length).toBe(1);
    service.addMostUsedFoods(1);
    // same food item was added before, therefore the list should not be ulpdated
    expect(service.user.foodShortlist.length).toBe(1);
  });

  it('should not add more than 5 food items', () => {
    service.addMostUsedFoods(1);
    service.addMostUsedFoods(2);
    service.addMostUsedFoods(3);
    service.addMostUsedFoods(4);
    service.addMostUsedFoods(5);
    expect(service.user.foodShortlist.length).toBe(5);
    service.addMostUsedFoods(6);
    expect(service.user.foodShortlist.length).toBe(5);
  });

  it('should calculate age', () => {
    // today: 15.3.2017 (2 = March)
    spyOn(service, 'getDateToday').and.returnValue(new Date(2017, 2, 15));
    let age = service.calculateAge('1997-3-15');
    expect(age).toBe(20);
  });

  it('should calculate age - day before birthday', () => {
    // today: 16.3.2017 (2 = March)
    spyOn(service, 'getDateToday').and.returnValue(new Date(2017, 2, 14));
    let age = service.calculateAge('1997-3-15');
    expect(age).toBe(19);
  });

  it('should calculate age - month before birthday', () => {
    // today: 16.2.2017 (1 = February)
    spyOn(service, 'getDateToday').and.returnValue(new Date(2017, 1, 15));
    let age = service.calculateAge('1997-3-15');
    expect(age).toBe(19);
  });
});
