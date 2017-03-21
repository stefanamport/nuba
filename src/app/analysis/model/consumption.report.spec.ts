import { ConsumptionReport } from './consumptionReport';
import { ComponentAnalysis } from './componentAnalysis';
import { ComponentCategory, ComponentName, TOO_LITTLE_PERCENTAGE, WAY_TOO_LITTLE_PERCENTAGE, TOO_MUCH_PERCENTAGE,
  WAY_TOO_MUCH_PERCENTAGE} from './constants';
import { LoginServiceStub } from '../../login/testing/fake.user.service';
import { TargetConsumptionMock_Male_19_30 } from '../testing/targetConsumptionMock';
import { Recommendation } from '../testing/recommendationMock';

describe('Consumption report', () => {
  let consumptionReport: ConsumptionReport;
  let loginService = new LoginServiceStub();

  beforeEach(() => {
    consumptionReport = new ConsumptionReport();
  });

  it('should create ConsumptionReportComponent', () => {
    expect(consumptionReport).toBeTruthy();
  });

  it('should create consumption report - consumption ok - recommendation', () => {
    let perfectAnalysis = TestHelper.getPerfectConsumption();
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(perfectAnalysis, user);

    let isExpectedRecommendation = 'Du ernährst dich ausgewogen. Weiter so!';
    expect(report.recommendation).toEqual(isExpectedRecommendation);
  });

  it('should create consumption report - consumption ok - analysis', () => {
    let perfectAnalysis = TestHelper.getPerfectConsumption();
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(perfectAnalysis, user);

    expect(report.analysis.size).toBe(3);
    report.analysis.forEach((value: Array<ComponentAnalysis>, key: ComponentCategory) => {
      for (let analysis of value) {
        let perfectConsumption = perfectAnalysis.get(analysis.name);
        let percentage = perfectConsumption.currentAmount / perfectConsumption.targetAmount * 100;

        expect(analysis.state).toEqual('OK');
        expect(percentage).toBe(analysis.percentage);
        expect(analysis.unit).toEqual(perfectConsumption.unit);
      }
    });
  });

  it('should create consumption report - too little proteins - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', TOO_LITTLE_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);

    let potentialProteinRecommendations = Recommendation.getProteinRecommendations();
    let expectedRecommendation = 'Du hast zu wenig Protein zu dir genommen. Iss doch';
    let sameRecommendationExists = false;
    potentialProteinRecommendations.forEach((value, key) => {
      if (report.recommendation === expectedRecommendation + ' ' + value + '.') {
        sameRecommendationExists = true;
      }
    });
    expect(sameRecommendationExists).toBeTruthy();
  });

  it('should create consumption report - too little proteins and way too little iron - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', TOO_LITTLE_PERCENTAGE);
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Eisen', WAY_TOO_LITTLE_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);

    let potentialIronRecommendations = Recommendation.getIronRecommendations();
    let expectedRecommendation = 'Du hast zu wenig Eisen zu dir genommen. Iss doch';
    let sameRecommendationExists = false;
    potentialIronRecommendations.forEach((value, key) => {
      if (report.recommendation === expectedRecommendation + ' ' + value + '.') {
        sameRecommendationExists = true;
      }
    });
    expect(sameRecommendationExists).toBeTruthy();
  });

  it('should create consumption report - too much proteins - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', TOO_MUCH_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);
    let expectedReommendation = 'Genug gegessen für heute. Iss morgen weniger!';
    expect(report.recommendation).toEqual(expectedReommendation);
  });

  it('should create consumption report - too much proteins and way too much iron - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', TOO_MUCH_PERCENTAGE);
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Eisen', WAY_TOO_MUCH_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);
    let expectedReommendation = 'Genug gegessen für heute. Iss morgen weniger!';
    expect(report.recommendation).toEqual(expectedReommendation);
  });

  it('should create consumption report - too much proteins and too little iron - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', TOO_MUCH_PERCENTAGE);
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Eisen', TOO_LITTLE_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);

    let potentialIronRecommendations = Recommendation.getIronRecommendations();
    let expectedRecommendation = 'Du hast zu wenig Eisen zu dir genommen. Iss doch';
    let sameRecommendationExists = false;
    potentialIronRecommendations.forEach((value, key) => {
      if (report.recommendation === expectedRecommendation + ' ' + value + '.') {
        sameRecommendationExists = true;
      }
    });
    expect(sameRecommendationExists).toBeTruthy();
  });

  it('should create consumption report - way too little proteins and way too little iron - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', WAY_TOO_LITTLE_PERCENTAGE);
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Eisen', WAY_TOO_LITTLE_PERCENTAGE);
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));

    let report = consumptionReport.createConsumptionReport(analysis, user);

    let potentialProteinRecommendations = Recommendation.getProteinRecommendations();
    let potentialIronRecommendations = Recommendation.getIronRecommendations();
    let sameRecommendationExists = false;

    // loop through all possible recommendations for protein and iron
    potentialProteinRecommendations.forEach((value1, key1) => {
      potentialIronRecommendations.forEach((value2, key2) => {
        // if the same food is suggested for Protein and Eisen then only one food is recommended.
        if (report.recommendation.search(value1) !== -1 || report.recommendation.search(value2) !== -1) {
          sameRecommendationExists = true;
        }
      });
    });
    expect(sameRecommendationExists).toBeTruthy();
  });

  it('should create consumption report - too much calories - recommendation', () => {
    let analysis = TestHelper.getPerfectConsumption();
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Kohlenhydrate', WAY_TOO_MUCH_PERCENTAGE);
    analysis = TestHelper.getAdjustedConsumption(analysis, 'Protein', WAY_TOO_LITTLE_PERCENTAGE);

    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 11:00'));
    spyOn(consumptionReport, 'getChance').and.returnValue(1);

    let report = consumptionReport.createConsumptionReport(analysis, user);

    let expectedRecommendation = 'Du hast zu viele Kohlenhydrate zu dir genommen. Geh rennen!';
    expect(expectedRecommendation).toEqual(report.recommendation);
  });

  it('should create consumption report - before 10 in the morning', () => {
    let analysis = TestHelper.getPerfectConsumption();
    let user = loginService.getUser();
    spyOn(consumptionReport, 'getDateToday').and.returnValue(new Date('2017-03-15 09:59'));

    let report = consumptionReport.createConsumptionReport(analysis, user);

    expect(report.recommendation).toEqual('Guten morgen ' + user.name + '!');
  });
});

class TestHelper {

  static getPerfectConsumption() {
    let analysisMap = new Map<string, ComponentAnalysis>();
    let targetConsumption = TargetConsumptionMock_Male_19_30;

    for (let key of Object.keys(targetConsumption)) {
      let obj = targetConsumption[key];
      for (let key2 of Object.keys(obj.components)) {
       let component = obj.components[key2];
        let unit = component['unit'];
        let name = component.name;

        let analysis = new ComponentAnalysis();
        analysis.category = <ComponentCategory>obj.category;
        analysis.currentAmount = parseInt(component.amount, 10);
        analysis.name = <ComponentName>component.name;
        analysis.targetAmount = parseInt(component.amount, 10);
        analysis.unit = component.unit;
        analysisMap.set(analysis.name, analysis);
      }
    }

    return analysisMap;
  }

  static getAdjustedConsumption(analysis, componentStr: string, consumptionPercentage: number) {
    let component = analysis.get(componentStr);
    if (consumptionPercentage === TOO_LITTLE_PERCENTAGE || consumptionPercentage === WAY_TOO_LITTLE_PERCENTAGE) {
      component.currentAmount = (component.targetAmount - 1) * consumptionPercentage / 100;
    } else {
      component.currentAmount = (component.targetAmount + 1) * consumptionPercentage / 100;
    }

    return analysis;
  }
}
