import { RoundPipe } from './round.pipe';

describe('RoundPipe', () => {

    let pipe: RoundPipe;

    beforeEach(() => {
        pipe = new RoundPipe();
    });

    it('should round up', () => {

        let input = 4.45;
        let rounded = pipe.transform(input);

        expect(rounded).toEqual(4.5);
    });

    it('should not round', () => {

        let input = 4;
        let rounded = pipe.transform(input);

        expect(rounded).toEqual(input);
    });

});
