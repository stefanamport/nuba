import { MomentPipe } from './momentjs.pipe';

describe('MomentPipe', () => {

    let pipe: MomentPipe;

    let input = 'Mon Feb 27 2017 21:22:12 GMT+0100 (CET)' ;
    let format = 'HH:mm YYYY Do MMMM';
    let output = '21:22 2017 27. Februar';

    beforeEach(() => {
        pipe = new MomentPipe();
    });

    it('should transform date', () => {

        let transformedDate = pipe.transform(input, format);

        expect(transformedDate).toEqual(output);
    });

});
