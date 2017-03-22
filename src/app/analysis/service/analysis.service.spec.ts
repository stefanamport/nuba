import { AnalysisService } from './analysis.service';
import { JournalEntry } from '../../journal/journalEntry';
import { Observable } from 'rxjs';
import { LoginServiceStub } from '../../login/testing/fake.user.service';
import { TargetConsumptionMock_Male } from '../testing/targetConsumptionMock';
import { async } from '@angular/core/testing';
import { FoodDetailsMock } from '../testing/foodDetailsMock';
import { FoodDetails } from '../../food/foodDetails';
import { ComponentAnalysis } from '../model/componentAnalysis';
import { ComponentCategory } from '../model/constants';
import {ConsumptionReport} from '../model/consumptionReport';

class FirebaseServiceStub {
  getList(url): Observable<any[]> {
    return Observable.of(TargetConsumptionMock_Male);
  }

  getObject(url, id): Observable<FoodDetails> {
    return Observable.of(FoodDetailsMock.getFoodDetails());
  }

}

class JournalEntriesServiceStub {
  journalEntries = [];

  getJournalEntries(): Observable<JournalEntry[]> {
    return Observable.of(this.journalEntries);
  }

  setJournalEntries() {
    let journalEntry = new JournalEntry();
    journalEntry.$key = 'j1';
    journalEntry.date = new Date('2017-03-15');
    journalEntry.editable = false;
    journalEntry.foodID = 1;
    journalEntry.quantity = 100;
    journalEntry.unit = 'mg';
    journalEntry.userId = 'user1';

    this.journalEntries.push(journalEntry);
  }

  setEmptyJournalEntries() {
    this.journalEntries = [];
  }

}

describe('AnalysisService', () => {
  let service: AnalysisService;
  let firebaseService: any = new FirebaseServiceStub();
  let journalEntryService: any = new JournalEntriesServiceStub();

  let loginService: any = new LoginServiceStub();

  beforeEach(() => {
    service = new AnalysisService(loginService, firebaseService, journalEntryService);
  });

  it('should create AnalysisService', async(() => {
    expect(service).toBeTruthy();
  }));

  it('should get consumption report - no journal entries', async(() => {
    journalEntryService.setEmptyJournalEntries();
    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let emptyReport = new ConsumptionReport();
      emptyReport.analysisComplete = true;
      expect(report).toEqual(emptyReport);
    });
  }));

  it('should get consumption report - age range 19 - 31', async(() => {
    journalEntryService.setJournalEntries();
    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let analysis: Map<ComponentCategory, Array<ComponentAnalysis>> = report.analysis;
      expect(analysis.size).toBeGreaterThan(0);
      let componentAnalyses = report.analysis.get('Makronährstoffe');

      let energyAnalysisExists = false;
      for (let componentAnalysis of componentAnalyses) {
        if (componentAnalysis.name === 'Protein') {
          expect(componentAnalysis.currentAmount).toBe(0.2);
          expect(componentAnalysis.targetAmount).toBe(56);
          expect(componentAnalysis.unit).toEqual('g/d');
          expect(componentAnalysis.category).toEqual('Makronährstoffe');
        }

        if (componentAnalysis.name === 'Energie kcal') {
          expect(componentAnalysis.currentAmount).toBe(295);
          expect(componentAnalysis.targetAmount).toBe(2200);
          energyAnalysisExists = true;
        }
      }

      expect(energyAnalysisExists).toBeTruthy();
    });
  }));

  it('should get consumption report - age range 31 - 50', () => {
    loginService.setAge(31);

    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let analysis: Map<ComponentCategory, Array<ComponentAnalysis>> = report.analysis;
      expect(analysis.size).toBeGreaterThan(0);
      let componentAnalyses = report.analysis.get('Makronährstoffe');

      for (let componentAnalysis of componentAnalyses) {
        if (componentAnalysis.name === 'Protein') {
          expect(componentAnalysis.currentAmount).toBe(0.2);
          expect(componentAnalysis.targetAmount).toBe(55);
          expect(componentAnalysis.unit).toEqual('g/d');
          expect(componentAnalysis.category).toEqual('Makronährstoffe');
        }
      }
    });
  });

  it('should get consumption report - age range 51 - 70', () => {
    loginService.setAge(51);

    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let analysis: Map<ComponentCategory, Array<ComponentAnalysis>> = report.analysis;
      expect(analysis.size).toBeGreaterThan(0);
      let componentAnalyses = report.analysis.get('Makronährstoffe');

      for (let componentAnalysis of componentAnalyses) {
        if (componentAnalysis.name === 'Protein') {
          expect(componentAnalysis.currentAmount).toBe(0.2);
          expect(componentAnalysis.targetAmount).toBe(54);
          expect(componentAnalysis.unit).toEqual('g/d');
          expect(componentAnalysis.category).toEqual('Makronährstoffe');
        }
      }
    });
  });

  it('should get consumption report - age range > 70', () => {
    loginService.setAge(71);

    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let analysis: Map<ComponentCategory, Array<ComponentAnalysis>> = report.analysis;
      expect(analysis.size).toBeGreaterThan(0);
      let componentAnalyses = report.analysis.get('Makronährstoffe');

      for (let componentAnalysis of componentAnalyses) {
        if (componentAnalysis.name === 'Protein') {
          expect(componentAnalysis.currentAmount).toBe(0.2);
          expect(componentAnalysis.targetAmount).toBe(53);
          expect(componentAnalysis.unit).toEqual('g/d');
          expect(componentAnalysis.category).toEqual('Makronährstoffe');
        }
      }
    });
  });

  it('should get consumption report - age range 18', () => {
    loginService.setAge(18);

    service.initConsumptionAnalysis(new Date('2017-03-22'));

    service.getConsumptionReport().subscribe((report) => {
      let analysis: Map<ComponentCategory, Array<ComponentAnalysis>> = report.analysis;
      expect(analysis.size).toBeGreaterThan(0);
      let componentAnalyses = report.analysis.get('Makronährstoffe');

      for (let componentAnalysis of componentAnalyses) {
        if (componentAnalysis.name === 'Protein') {
          expect(componentAnalysis.currentAmount).toBe(0.2);
          expect(componentAnalysis.targetAmount).toBe(52);
          expect(componentAnalysis.unit).toEqual('g/d');
          expect(componentAnalysis.category).toEqual('Makronährstoffe');
        }
      }
    });
  });
});
