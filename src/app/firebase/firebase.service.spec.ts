import { FirebaseService } from './firebase.service';
import { Food } from '../food/food';
import { Reginfo } from '../login/reginfo';

class FirebaseListObservableMock {
  update(id, item) {
    return 'updated ' + id + ' - ' + item.name;
  }

  push(item) {
    return 'pushed - ' + item.name;
  }

  remove(id) {
    return 'removed ' + id;
  }
}

class AngularFireStub {
  database = {
    object: function (resource: string) {},
    list : function (resource: string) {
      let mock = new FirebaseListObservableMock();

      return mock;
    }
  };

  auth = {
    uid: 'uid1',
    login: function(provider) {},
    createUser: function(registrationInfo) {},
    logout: function() {}
  };
}

describe('FirebaseService', () => {
  let service: any;
  let af: any = new AngularFireStub();

  beforeEach(() => {
    service = new FirebaseService(af);
  });

  it('should create firebase service', () => {
    expect(service).toBeTruthy();
  });

  it('should get list', () => {
    spyOn(service.af.database, 'list');

    service.getList('food');

    expect(service.af.database.list).toHaveBeenCalledWith('food');
  });

  it('should get object', () => {
    spyOn(service.af.database, 'object');

    service.getObject('food', 'id1');

    expect(service.af.database.object).toHaveBeenCalledWith('food/id1');
  });

  it('should add item', () => {
    let food: Food = new Food();
    food.name = 'Test';

    let addedItems = service.addItem('food', food );

    expect(addedItems).toEqual('pushed - ' + food.name);
  });

  it('should update item', () => {
    let food: Food = new Food();
    food.name = 'Test';

    let updatedItems = service.updateItem('food', 'id1', food);

    expect(updatedItems).toEqual('updated id1 - ' + food.name);
  });

  it('should delete item', () => {
    let deletedItem = service.deleteItem('food', 'id1');

    expect(deletedItem).toEqual('removed id1');
  });

  it('should get auth', () => {
    let auth = service.getAuth();

    expect(auth.uid).toEqual('uid1');
  });

  it('should login', () => {
    spyOn(service.af.auth, 'login');

    service.login('test');

    expect(service.af.auth.login).toHaveBeenCalledWith('test');
  });

  it('should create new user', () => {
    spyOn(service.af.auth, 'createUser');
    let registrationInfo = new Reginfo();
    registrationInfo.email = 'hans';
    registrationInfo.pass = 'pw';

    service.newUser(registrationInfo);

    expect(service.af.auth.createUser).toHaveBeenCalledWith({ email: 'hans', password: 'pw' });
  });

  it('should logout', () => {
    spyOn(service.af.auth, 'logout');

    service.logout();

    expect(service.af.auth.logout).toHaveBeenCalled();
  });
});
