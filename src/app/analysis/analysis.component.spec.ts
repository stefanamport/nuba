import { AnalysisComponent } from './analysis.component';
import { Observable } from 'rxjs';
import {ConsumptionReport} from './model/consumptionReport';
import {ComponentAnalysis} from './model/componentAnalysis';
import {ComponentCategory} from './model/constants';
import {async} from '@angular/core/testing';
import {User} from '../login/user';

class DateChooserServiceStub {
  getChosenDateAsObservable() {
    return Observable.of(new Date());
  }
}

class LoginServiceStub {
  getUserAsObservable() {
    return Observable.of(new User());
  }
}

class AnalysisServiceStub {
  getConsumptionReport() {
    return Observable.of(this.getConsumptionStub());
  }

  initConsumptionAnalysis(date) { }

  getConsumptionStub() {
    let consumptionReport = new ConsumptionReport();
    consumptionReport.recommendation = 'Eat some meat';
    consumptionReport.analysisComplete = true;

    let consumptionMap = new Map<ComponentCategory, Array<ComponentAnalysis>>();
    let consumptionAnalyses = [];

    let componentAnalysis = new ComponentAnalysis();
    componentAnalysis.category = 'Makronährstoffe';
    componentAnalysis.currentAmount = 300;
    componentAnalysis.name = 'Protein';
    componentAnalysis.targetAmount = 600;
    componentAnalysis.percentage = 50;
    componentAnalysis.state = 'WAY_TOO_LITTLE';
    componentAnalysis.unit = 'mg/d';

    consumptionAnalyses.push(componentAnalysis);
    consumptionMap.set('Makronährstoffe', consumptionAnalyses);
    consumptionReport.analysis = consumptionMap;

    return consumptionReport;
  }
}


describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let dateChooserService: any;
  let analysisService: any;
  let loginService: any;

  beforeEach(() => {
    dateChooserService = new DateChooserServiceStub();
    analysisService = new AnalysisServiceStub();
    loginService = new LoginServiceStub();

    component = new AnalysisComponent(
      analysisService,
      dateChooserService,
      loginService
    );

    component.ngOnInit();
  });

  it('should create AnalysisComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return chart bar length', () => {
    let chartBarLength = component.chartBarLength(50);

    expect(chartBarLength).toEqual('50%');
  });

  it('should return chart bar length - consumption over 100%', () => {
    let chartBarLength = component.chartBarLength(100.1);

    expect(chartBarLength).toEqual('100%');
  });

  it('should return chart bar length - consumption lower than 3%', () => {
    let chartBarLength = component.chartBarLength(2.9);

    expect(chartBarLength).toEqual('3%');
  });

  it('should return current chart position from right in percentage', () => {
    let chartCurrentPos = component.chartCurrentPos(40);

    expect(chartCurrentPos).toEqual('60%');
  });

  it('should return current chart position from right in percentage - high consumption', () => {
    let chartCurrentPos = component.chartCurrentPos(99.6);

    expect(chartCurrentPos).toEqual('0.5%');
  });

  it('should return current chart position from right in percentage - low conumption', () => {
    let chartCurrentPos = component.chartCurrentPos(2.9);

    expect(chartCurrentPos).toEqual('97%');
  });

  it('should open category group', () => {
    let category = { title: 'Elemente', vals: Array[8], open: false };

    component.dropoutGroup(category);

    expect(category.open).toBeTruthy();
  });

  it('should close category group', () => {
    let category = { title: 'Elemente', vals: Array[8], open: true };

    component.dropoutGroup(category);

    expect(category.open).toBeFalsy();
  });

  it('should not fail if category group undefined', () => {
    let category = undefined;

    component.dropoutGroup(category);

    expect(category).toBeFalsy();
  });

  it('should should transition symphony - component is loading', async(() => {
    let report = analysisService.getConsumptionStub();
    component.report = report;
    component.report.analysisComplete = true;
    component.componentIsLoading = true;

    component.ngOnInit();

    expect(component.componentIsLoading).toBeFalsy();
    expect(component.aniListState).toEqual('loaded');
  }));

  it('should transition symphony - component is not loading', async(() => {
    let report = analysisService.getConsumptionStub();
    component.report = report;
    component.report.analysisComplete = true;
    component.componentIsLoading = false;

    component.ngOnInit();

    expect(component.aniListState).toEqual('changing');
  }));
});
