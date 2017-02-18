import { OrderByAlphabetPipe } from './orderByAlphabet.pipe';

describe('OrderByAlphabetPipe', () => {

    let pipe: OrderByAlphabetPipe;

    let list: Array<any> = [
          {name: 'a'},
          {name: 'd'},
          {name: 'c'},
          {name: 'b'}
        ];

    let listSorted: Array<any> = [
          {name: 'a'},
          {name: 'b'},
          {name: 'c'},
          {name: 'd'}
        ];

    beforeEach(() => {
        pipe = new OrderByAlphabetPipe();
    });

    it('should sort by abc', () => {

        let index = 'name';

        let listPipeSorted = pipe.transform(list, index);

        expect(listPipeSorted).toEqual(listSorted);
    });

});
