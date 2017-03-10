import { TestBed, inject } from '@angular/core/testing';

import { DateChooserService } from './date-chooser.service';

describe('DateChooserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateChooserService]
    });
  });

  it('should ...', inject([DateChooserService], (service: DateChooserService) => {
    expect(service).toBeTruthy();
  }));
});
