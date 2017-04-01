import { OrderByDatePipe } from './orderByDate.pipe';

describe('OrderByDatePipe', () => {

    let pipe: OrderByDatePipe;

    let list: Array<any> = [
          {date: 'Apr 01 2017 11:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 02 2017 10:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:11:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2018 10:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:10:32 GMT+0200 (CEST)'}
        ];

        let listSorted: Array<any> = [
          {date: 'Apr 01 2018 10:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 02 2017 10:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 11:10:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:11:31 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:10:32 GMT+0200 (CEST)'},
          {date: 'Apr 01 2017 10:10:31 GMT+0200 (CEST)'}
        ];

    beforeEach(() => {
        pipe = new OrderByDatePipe();
    });

    it('should sort by date', () => {

        let index = 'date';

        let listPipeSorted = pipe.transform(list, index);

        expect(listPipeSorted).toEqual(listSorted);
    });

});
