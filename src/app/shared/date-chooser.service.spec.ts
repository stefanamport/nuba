import { DateChooserService } from './date-chooser.service';
import { async } from '@angular/core/testing';

describe('DateChooserService', () => {
  let service: DateChooserService;
  let initialDate = new Date('2017-03-21');
  let testDate = new Date('2017-01-01');

  beforeEach(() => {
    service = new DateChooserService();
    service.setChosenDate(initialDate);

    service.getChosenDateAsObservable().subscribe((date) => {
      testDate = date;
    });
  });

  it('should create DateChooserService', () => {
    expect(service).toBeTruthy();
  });

  it('should get chosen date', () => {
    let date = new Date('2017-03-21');
    service.setChosenDate(date);

    testDate = service.getChosenDate();

    expect(date).toEqual(testDate);
  });

  it('should get chosen date as observable', async(() => {
    expect(testDate).toEqual(initialDate);
  }));
});
