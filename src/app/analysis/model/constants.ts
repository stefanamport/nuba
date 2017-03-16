export type State = 'WAY_TOO_MUCH' | 'TOO_MUCH' | 'OK' | 'TOO_LITTLE' | 'WAY_TOO_LITTLE';

export type ComponentCategory =
  'Makronährstoffe' | 'Elemente' | 'Vitamine';

export type ComponentName =
  'Vitamin A' | 'Vitamin B6' | 'Vitamin B12' | 'Vitamin C' | 'Vitamin D' | 'Vitamin E' |
  'Wasser' | 'Kohlenhydrate' | 'Ballaststoffe' | 'Protein' | 'Energie kcal' |
  'Kalzium' | 'Eisen' | 'Magnesium' | 'Phosphor' | 'Zink' | 'Natrium' | 'Chlorid' | 'Kalium';

export const WAY_TOO_MUCH_PERCENTAGE = 130;
export const TOO_MUCH_PERCENTAGE = 110;
export const TOO_LITTLE_PERCENTAGE = 90;
export const WAY_TOO_LITTLE_PERCENTAGE = 70;

export type AgeRange = '18' | '19–30' | '31–50' | '51–70' | '> 70';
