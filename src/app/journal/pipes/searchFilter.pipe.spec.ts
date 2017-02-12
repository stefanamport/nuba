import { SearchFilterPipe } from './searchFilter.pipe';

import { Food } from '../../food/food';

describe('SearchFilterPipe', () => {

    let pipe: SearchFilterPipe;
    let foodList: Array<Food> = [
          {name: 'Apfelbanane', $key: 1},
          {name: 'Fleischbällchen vegetarisch', $key: 2},
          {name: 'Banane', $key: 3},
          {name: 'Joghurt glutenfrei', $key: 4}
        ];

    let filteredListToCompare = [foodList[0], foodList[2]];

    let mostUsedFoods: Array<number> = [1, 2, 4];
    let mostUsedFoodsToCompare: Array<Food> = [foodList[0], foodList[1], foodList[3]];

    beforeEach(() => {
        pipe = new SearchFilterPipe();
    });

    it('filter.length > 2: should return filtered List', () => {

        let searchString = 'ban';

        let filteredListPiped = pipe.transform(foodList, searchString, mostUsedFoods);

        expect(filteredListPiped).toEqual(filteredListToCompare);
    });

    it('filter.length < 2: should return filtered List', () => {

        let searchString = 'ba';

        let filteredListPiped = pipe.transform(foodList, searchString, mostUsedFoods);

        expect(filteredListPiped).toEqual(mostUsedFoodsToCompare);
    });

    it('no filter: should return most used Foods', () => {

        let searchString = '';

        let filteredListPiped = pipe.transform(foodList, searchString, mostUsedFoods);

        expect(filteredListPiped).toEqual(mostUsedFoodsToCompare);
    });

    it('no most used Foods: should return empty array', () => {

        let searchString = '';
        mostUsedFoods = false;

        let filteredListPiped = pipe.transform(foodList, searchString, mostUsedFoods);

        expect(filteredListPiped).toEqual([]);
    });

});
