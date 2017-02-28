import { ComponentAnalysis } from './componentAnalysis';
import { WAY_TOO_MUCH, TOO_MUCH, WAY_TOO_LITTLE, TOO_LITTLE, ComponentName } from './constants';
import { User } from '../../login/user';

export class ConsumptionReport {
  public componentAnalysis: Array<ComponentAnalysis> = [];
  public recommendation: string;

  private wayTooLittle: Array<string> = [];
  private tooLittle: Array<string> = [];
  private wayTooMuch: Array<string> = [];
  private tooMuch: Array<string> = [];
  private ok: Array<string> = [];

  private static pickRandomVal(upperValue: number) {
    return Math.floor(Math.random() * upperValue);
  }

  /*
   * Static recommendations the application randomly chooses from for a given component (e.g. Proteins).
   */
  private static getRecommendation(componentName: ComponentName): string {
    let recommendationMap: Map<ComponentName, Array<string>> = new Map<ComponentName, Array<string>>();

    let muchProteins: Array<string> = [];
    muchProteins.push('ein Stück Emmentalerkäse ');
    muchProteins.push('ein Stück Appenzellerkäse ');
    muchProteins.push('ein Kalbsplätzli ');
    muchProteins.push('ein Rindsplätzli ');
    muchProteins.push('einen Schweinebraten ');
    muchProteins.push('ein paar Sojabohnen ');
    muchProteins.push('ein paar Pinienkernen ');
    recommendationMap.set('Protein', muchProteins);

    let muchFibres: Array<string> = [];
    muchFibres.push('Aprikosen ');
    muchFibres.push('Bohnen ');
    muchFibres.push('eine Birne ');
    muchFibres.push('ein Linsengericht ');
    muchFibres.push('Popcorn ');
    muchFibres.push('ein Knäckebrot ');
    muchFibres.push('eine Portion Teigwaren ');
    recommendationMap.set('Ballaststoffe', muchFibres);

    let muchCarbs: Array<string> = [];
    muchCarbs.push('Bohnen ');
    muchCarbs.push('ein Knäckebrot ');
    muchCarbs.push('ein Linsengericht ');
    muchCarbs.push('eine Portion Teigwaren ');
    muchCarbs.push('ein Stück Roggenbrot ');
    recommendationMap.set('Kohlenhydrate', muchCarbs);

    let muchVitaminA: Array<string> = [];
    muchVitaminA.push('Lebern ');
    muchVitaminA.push('eine Karotte ');
    recommendationMap.set('Vitamin A', muchVitaminA);

    let muchVitaminB6: Array<string> = [];
    muchVitaminB6.push('eine Banane ');
    muchVitaminB6.push('Lebern ');
    muchVitaminB6.push('Bohnen ');
    muchVitaminB6.push('ein wenig Knoblauch und danach einen Kaugummi ');
    muchVitaminB6.push('eine Pouletbrust ');
    muchVitaminB6.push('ein Rindsentrecote ');
    recommendationMap.set('Vitamin B6', muchVitaminB6);

    let muchVitaminB12: Array<string> = [];
    muchVitaminB12.push('eine Forelle ');
    muchVitaminB12.push('ein Ei ');
    muchVitaminB12.push('ein Kaninchen ');
    muchVitaminB12.push('Lachs ');
    muchVitaminB12.push('Rindsfleisch ');
    muchVitaminB12.push('Thunfisch ');
    recommendationMap.set('Vitamin B12', muchVitaminB12);

    let muchVitaminC: Array<string> = [];
    muchVitaminC.push('Bohnen ');
    muchVitaminC.push('Broccoli ');
    muchVitaminC.push('einen Kiwi ');
    muchVitaminC.push('eine Peperoni ');
    muchVitaminC.push('Rosenkohl ');
    muchVitaminC.push('Beeren ');
    recommendationMap.set('Vitamin C', muchVitaminC);

    let muchVitaminD: Array<string> = [];
    muchVitaminD.push('einen Fisch ');
    muchVitaminD.push('Kalbfleisch ');
    muchVitaminD.push('Lammfleisch ');
    muchVitaminD.push('eine Peperoni ');
    muchVitaminD.push('Rosenkohl ');
    muchVitaminD.push('Beeren ');
    recommendationMap.set('Vitamin D', muchVitaminD);

    let muchVitaminE: Array<string> = [];
    muchVitaminE.push('ein paar Nüsse ');
    muchVitaminE.push('ein paar Sonnenblumenkerne ');
    muchVitaminE.push('ein paar Kürbiskerne ');
    recommendationMap.set('Vitamin E', muchVitaminE);

    let muchCalcium: Array<string> = [];
    muchCalcium.push('Raclettekäse ');
    muchCalcium.push('Appenzellerkäse ');
    muchCalcium.push('ein Fondue ');
    muchCalcium.push('Tilsiter ');
    muchCalcium.push('Greyerzer ');
    recommendationMap.set('Kalzium', muchCalcium);

    let muchIron: Array<string> = [];
    muchIron.push('eine Blutwurst ');
    // muchIron.push('einen Kakao ');
    muchIron.push('Pinienkerne ');
    muchIron.push('Sojabohnen ');
    recommendationMap.set('Eisen', muchIron);

    let muchMagnesium: Array<string> = [];
    muchMagnesium.push('ein paar Nüsse ');
    // muchMagnesium.push('einen Kakao ');
    muchMagnesium.push('Sardellen ');
    recommendationMap.set('Magnesium', muchMagnesium);

    let muchPhosphorus: Array<string> = [];
    muchPhosphorus.push('Appenzellerkäse ');
    // muchPhosphorus.push('Trink einen Kakao');
    muchPhosphorus.push('Pinienkerne ');
    recommendationMap.set('Phosphor', muchPhosphorus);

    let muchZinc: Array<string> = [];
    muchZinc.push('einen Kalbsbraten');
    muchZinc.push('Rindfleisch');
    muchZinc.push('Schweinefleisch');
    muchZinc.push('Sonnenblumenkernen');
    recommendationMap.set('Zink', muchZinc);

    let muchSodium: Array<string> = [];
    muchSodium.push('Rohschinken');
    muchSodium.push('eine Weisswurst');
    muchSodium.push('Lachs');
    muchSodium.push('Oliven');
    recommendationMap.set('Natrium', muchSodium);

    let muchChloride: Array<string> = [];
    muchChloride.push('ein Bauernschüblig');
    muchChloride.push('Rohschinken');
    muchChloride.push('eine Weisswurst');
    muchChloride.push('Salami');
    recommendationMap.set('Chlorid', muchChloride);

    let muchPotassium: Array<string> = [];
    muchPotassium.push('Aprikosen');
    muchPotassium.push('eine Banane');
    muchPotassium.push('Kichererbesen');
    recommendationMap.set('Kalium', muchPotassium);

    let muchWater: Array<string> = [];
    muchWater.push('Bouillonsuppe');
    recommendationMap.set('Wasser', muchWater);

    let array = recommendationMap.get(componentName);

    let rand = ConsumptionReport.pickRandomVal(array.length);
    return array[rand];
  }

  /*
   * Creates a report containing a target/current comparison of the food components
   * and a recommendation what to eat next to achieve the target.
   */
  public createConsumptionReport(compAnalysis: Map<string, ComponentAnalysis>, user: User): ConsumptionReport {
    this.compareTargetCurrentConsumption(compAnalysis);
    this.createRecommendation(user);

    return this;
  }

  /*
   * Compares current consumption with the target consumption for each of the food components (e.gcarbs)
   */
  private compareTargetCurrentConsumption(compAnalysisMap: Map<string, ComponentAnalysis>) {
    compAnalysisMap.forEach((analysis: ComponentAnalysis) => {
      let percentage = analysis.currentAmount / analysis.targetAmount;
      if (percentage > WAY_TOO_MUCH) {
        analysis.state = 'WAY_TOO_MUCH';
        this.wayTooMuch.push(analysis.name);
      } else if (percentage > TOO_MUCH) {
        analysis.state = 'TOO_MUCH';
        this.tooMuch.push(analysis.name);
      } else if (percentage < WAY_TOO_LITTLE) {
        analysis.state = 'WAY_TOO_LITTLE';
        this.wayTooLittle.push(analysis.name);
      } else if (percentage < TOO_LITTLE) {
        analysis.state = 'TOO_LITTLE';
        this.tooLittle.push(analysis.name);
      } else {
        analysis.state = 'OK';
        this.ok.push(analysis.name);
      }
      this.componentAnalysis.push(analysis);
    });
  }

  /*
   * Creates a recommendation based on the gathered target/current consumption per
   * food component.
   * - Recommendations for WAY_TOO_LOW components have higher priority than recommendations for TOO_LOW and TOO_MUCH
   *   components.
   * - Recommendations for components in the (WAY_)TOO_MUCH bucket are only created for carbs.
   * - With a chance of 30% the recommendation for WAY_TOO_LOW components is overruled by a recommendation for
   *   the WAY_TOO_MUCH components (only carbs at the moment).
   */
  private createRecommendation(user: User) {
    this.recommendation = null;
    if (this.wayTooLittle.length > 0) {
      this.createRecommendationForTooLittleConsumption(this.wayTooLittle);
    }

    if (this.tooLittle.length > 0 && this.recommendation === null) {
      this.createRecommendationForTooLittleConsumption(this.tooLittle);
    }

    if (this.wayTooMuch.length > 0) {
        this.createRecommendationForTooMuchConsumption(this.wayTooMuch, 3);
    }

    if (this.tooMuch.length > 0 && this.recommendation === null) {
      this.createRecommendationForTooMuchConsumption(this.tooMuch, 1);
    }

    this.setRecommendationBasedOnTime(user);

    if (this.recommendation === null) {
      this.recommendation = 'Du ernährst dich ausgewogen. Weiter so!';
    }
  }

  private setRecommendationBasedOnTime(user: User) {
    let date = new Date();
    if (date.getHours() < 10) {
      this.recommendation = 'Guten morgen ' + user.name + '!';
    }
  }

  /*
   * Chooses randomly for which components (max 2) a recommendation is created.
   */
  private createRecommendationForTooLittleConsumption(array) {
    let randomVal1 = ConsumptionReport.pickRandomVal(array.length);
    let food1 = ConsumptionReport.getRecommendation(array[randomVal1]);
    let randomVal2 = ConsumptionReport.pickRandomVal(array.length);
    let food2 = ConsumptionReport.getRecommendation(array[randomVal2]);

    this.recommendation = 'Du hast zu wenig ' + array[randomVal1];
    if (randomVal1 !== randomVal2) {
      this.recommendation += ' und ' + array[randomVal2];
    }
    this.recommendation += ' zu dir genommen. Iss doch ' + food1;

    if (randomVal1 !== randomVal2) {
      this.recommendation += ' oder ' + food2;
    }
    this.recommendation += '.';
  }

  private createRecommendationForTooMuchConsumption(array, chance) {
    for (let entry of array) {
      if (entry === 'Kohlenhydrate') {
        let rand = ConsumptionReport.pickRandomVal(chance);
        if (rand === 0) {
          this.recommendation = 'Du hast zu viele Kohlenhydrate zu dir genommen. Geh rennen!';
        }
      }
    }
  }
}
