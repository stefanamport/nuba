export class Recommendation {

  static getProteinRecommendations() {
    let muchProteins: Array<string> = [];
    muchProteins.push('ein Stück Emmentalerkäse');
    muchProteins.push('ein Stück Appenzellerkäse');
    muchProteins.push('ein Kalbsplätzli');
    muchProteins.push('ein Rindsplätzli');
    muchProteins.push('einen Schweinebraten');
    muchProteins.push('ein paar Sojabohnen');
    muchProteins.push('ein paar Pinienkernen');

    return muchProteins;
  }

  static getIronRecommendations() {
    let muchIron: Array<string> = [];
    muchIron.push('eine Blutwurst');
    // muchIron.push('einen Kakao');
    muchIron.push('Pinienkerne');
    muchIron.push('Sojabohnen');

    return muchIron;
  }
}
