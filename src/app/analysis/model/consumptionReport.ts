import { ComponentAnalysis } from './componentAnalysis';
import { WAY_TOO_MUCH, State, TOO_MUCH, WAY_TOO_LITTLE, TOO_LITTLE } from './constants';

export class ConsumptionReport {
  public componentAnalysis: Array<ComponentAnalysis> = [];
  public recommendation: string;

  private wayTooLittle: Array<string> = [];
  private tooLittle: Array<string> = [];
  private wayTooMuch: Array<string> = [];
  private tooMuch: Array<string> = [];

  public createConsumptionReport(compAnalysis: Map<string, ComponentAnalysis>): ConsumptionReport {
    this.compareTargetCurrentConsumption(compAnalysis);
    this.createRecommendation();

    return this;
  }

  private compareTargetCurrentConsumption(compAnalysisMap: Map<string, ComponentAnalysis>) {
    compAnalysisMap.forEach((analysis: ComponentAnalysis) => {
      let percentage = analysis.currentAmount / analysis.targetAmount;
      if (percentage > WAY_TOO_MUCH) {
        analysis.state = State.WAY_TOO_MUCH;
        this.wayTooMuch.push(analysis.name);
      } else if (percentage > TOO_MUCH) {
        analysis.state = State.TOO_MUCH;
        this.tooMuch.push(analysis.name);
      } else if (percentage < WAY_TOO_LITTLE) {
        analysis.state = State.WAY_TOO_LITTLE;
        this.wayTooLittle.push(analysis.name);
      } else if (percentage < TOO_LITTLE) {
        analysis.state = State.TOO_LITTLE;
        this.tooLittle.push(analysis.name);
      }
      this.componentAnalysis.push(analysis);
    });
  }

  private createRecommendation() {
    this.recommendation = '';
    if (this.wayTooLittle.length > 0 || this.wayTooMuch.length > 0) {
      if (this.wayTooMuch.length > 0) {
        this.createRecommendationForTooMuchConsumption(this.wayTooMuch);
      }
      if (this.wayTooLittle.length > 0) {
        this.createRecommendationForTooLittleConsumption(this.wayTooLittle);
      }
    } else {
      if (this.tooMuch.length > 0) {
        this.createRecommendationForTooMuchConsumption(this.tooMuch);
      }
      if (this.tooLittle.length > 0) {
        this.createRecommendationForTooLittleConsumption(this.tooLittle);
      }
    }
  }

  private createRecommendationForTooLittleConsumption(tooLittle: Array<string>) {
    let chosenstring = this.pickRandomValue(this.wayTooLittle);
    this.recommendation += this.getRecommendation(chosenstring);
  }

  private createRecommendationForTooMuchConsumption(tooMuch: Array<string>) {
    let chosenItem = this.pickRandomValue(this.wayTooMuch);
    this.recommendation += 'Du hast zu viel ' + chosenItem + ' gegessen! ';
  }

  private pickRandomValue(array: Array<any>) {
    if (array === null || array === undefined) {
      return null;
    }
    return array[Math.floor(Math.random() * array.length)];
  }

  private getRecommendation(string: string): string {
    let recommendationMap: Map<string, Array<string>> = new Map<string, Array<string>>();

    let muchProteins: Array<string> = [];
    muchProteins.push('Iss ein Stück Emmentalerkäse. ');
    muchProteins.push('Iss ein Stück Appenzellerkäse. ');
    muchProteins.push('Iss ein Kalbsplätzli. ');
    muchProteins.push('Iss ein Rindsplätzli. ');
    muchProteins.push('Iss einen Schweinebraten. ');
    muchProteins.push('Iss ein paar Sojabohnen. ');
    muchProteins.push('Iss ein paar Pinienkernen. ');
    recommendationMap.set('Protein', muchProteins);

    let muchFibres: Array<string> = [];
    muchFibres.push('Iss Aprikosen. ');
    muchFibres.push('Iss Bohnen. ');
    muchFibres.push('Iss eine Birne. ');
    muchFibres.push('Iss ein Linsengericht. ');
    muchFibres.push('Iss Popcorn. ');
    muchFibres.push('Iss ein Knäckebrot. ');
    muchFibres.push('Iss eine Portion Teigwaren. ');
    recommendationMap.set('Ballaststoffe', muchFibres);

    let muchCarbs: Array<string> = [];
    muchCarbs.push('Iss Bohnen. ');
    muchCarbs.push('Iss ein Knäckebrot. ');
    muchCarbs.push('Iss ein Linsengericht. ');
    muchCarbs.push('Iss eine Portion Teigwaren. ');
    muchCarbs.push('Iss ein Stück Roggenbrot. ');
    recommendationMap.set('Kohlenhydrate', muchCarbs);

    let muchVitaminA: Array<string> = [];
    muchVitaminA.push('Iss Lebern. ');
    muchVitaminA.push('Iss eine Karotte. ');
    recommendationMap.set('Vitamin A', muchVitaminA);

    let muchVitaminB1: Array<string> = [];
    muchVitaminB1.push('Iss ein paar Nüsse. ');
    muchVitaminB1.push('Iss Schweinefleisch. ');
    muchVitaminB1.push('Iss Sojabohnen. ');
    recommendationMap.set('Vitamin B1', muchVitaminB1);

    let muchVitaminB2: Array<string> = [];
    muchVitaminB2.push('Iss ein Ei. ');
    muchVitaminB2.push('Iss Lebern. ');
    muchVitaminB2.push('Iss Champignon. ');
    muchVitaminB2.push('Iss Bohnen. ');
    recommendationMap.set('Vitamin B2', muchVitaminB2);

    let muchVitaminB6: Array<string> = [];
    muchVitaminB6.push('Iss eine Banane. ');
    muchVitaminB6.push('Iss Lebern. ');
    muchVitaminB6.push('Iss Bohnen. ');
    muchVitaminB6.push('Iss ein wenig Knoblauch und danach einen Kaugummi. ');
    muchVitaminB6.push('Iss eine Pouletbrust. ');
    muchVitaminB6.push('Iss ein Rindsentrecote ');
    recommendationMap.set('Vitamin B6', muchVitaminB6);

    let muchVitaminB12: Array<string> = [];
    muchVitaminB12.push('Iss eine Forelle. ');
    muchVitaminB12.push('Iss ein Ei. ');
    muchVitaminB12.push('Iss ein Kaninchen. ');
    muchVitaminB12.push('Iss Lachs. ');
    muchVitaminB12.push('Iss Rindsfleisch. ');
    muchVitaminB12.push('Iss Thunfisch. ');
    recommendationMap.set('Vitamin B12', muchVitaminB12);

    let muchVitaminC: Array<string> = [];
    muchVitaminC.push('Iss Bohnen. ');
    muchVitaminC.push('Iss Broccoli. ');
    muchVitaminC.push('Iss einen Kiwi. ');
    muchVitaminC.push('Iss eine Peperoni. ');
    muchVitaminC.push('Iss Rosenkohl. ');
    muchVitaminC.push('Iss Beeren. ');
    recommendationMap.set('Vitamin C', muchVitaminC);

    let muchVitaminD: Array<string> = [];
    muchVitaminD.push('Iss einen Fisch. ');
    muchVitaminD.push('Iss Kalbfleisch. ');
    muchVitaminD.push('Iss Lammfleisch. ');
    muchVitaminD.push('Iss eine Peperoni. ');
    muchVitaminD.push('Iss Rosenkohl. ');
    muchVitaminD.push('Iss Beeren. ');
    recommendationMap.set('Vitamin D', muchVitaminD);

    let muchVitaminE: Array<string> = [];
    muchVitaminE.push('Iss ein paar Nüsse. ');
    muchVitaminE.push('Iss ein paar Sonnenblumenkerne. ');
    muchVitaminE.push('Iss ein paar Kürbiskerne. ');
    recommendationMap.set('Vitamin E', muchVitaminE);

    let muchCalcium: Array<string> = [];
    muchCalcium.push('Iss Raclettekäse. ');
    muchCalcium.push('Iss Appenzellerkäse. ');
    muchCalcium.push('Iss ein Fondue. ');
    muchCalcium.push('Iss Tilsiter. ');
    muchCalcium.push('Iss Greyerzer. ');
    recommendationMap.set('Kalzium', muchCalcium);

    let muchIron: Array<string> = [];
    muchIron.push('Iss eine Blutwurst. ');
    muchIron.push('Trink einen Kakao. ');
    muchIron.push('Iss Pinienkerne. ');
    muchIron.push('Iss Sojabohnen. ');
    recommendationMap.set('Eisen', muchIron);

    let muchMagnesium: Array<string> = [];
    muchMagnesium.push('Iss ein paar Nüsse. ');
    muchMagnesium.push('Trink einen Kakao. ');
    muchMagnesium.push('Iss Sardellen. ');
    recommendationMap.set('Magnesium', muchMagnesium);

    let muchPhosphorus: Array<string> = [];
    muchPhosphorus.push('Iss Appenzellerkäse. ');
    muchPhosphorus.push('Trink einen Kakao. ');
    muchPhosphorus.push('Iss Pinienkerne. ');
    recommendationMap.set('Phosphor', muchPhosphorus);

    let muchZinc: Array<string> = [];
    muchZinc.push('Iss einen Kalbsbraten. ');
    muchZinc.push('Iss Rindfleisch. ');
    muchZinc.push('Iss Schweinefleisch. ');
    muchZinc.push('Iss Sonnenblumenkernen. ');
    recommendationMap.set('Zink', muchZinc);

    let muchSodium: Array<string> = [];
    muchSodium.push('Iss Rohschinken. ');
    muchSodium.push('Iss eine Weisswurst. ');
    muchSodium.push('Iss Lachs. ');
    muchSodium.push('Iss Oliven. ');
    recommendationMap.set('Natrium', muchSodium);

    let muchChloride: Array<string> = [];
    muchChloride.push('Iss ein Bauernschüblig. ');
    muchChloride.push('Iss Rohschinken. ');
    muchChloride.push('Iss eine Weisswurst. ');
    muchChloride.push('Iss Salami. ');
    recommendationMap.set('Chlorid', muchChloride);

    let muchPotassium: Array<string> = [];
    muchPotassium.push('Iss Aprikosen. ');
    muchPotassium.push('Iss eine Banane. ');
    muchPotassium.push('Iss Kichererbesen. ');
    recommendationMap.set('Kalium', muchPotassium);

    return this.pickRandomValue(recommendationMap.get(string));
  }
}
