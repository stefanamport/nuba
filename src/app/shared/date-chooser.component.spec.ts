import {DateChooserComponent} from './date-chooser.component';
import {DateChooserService} from './date-chooser.service';

describe('DateChooserComponent', () => {
  let component: DateChooserComponent;
  let dateChooserService: DateChooserService;

  beforeEach(() => {
    component = new DateChooserComponent(dateChooserService);
  });

  it('should create DateChooserComponent', () => {
    expect(component).toBeTruthy();
  });
});
