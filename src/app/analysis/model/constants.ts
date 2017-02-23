export enum State {
  WAY_TOO_MUCH,
  TOO_MUCH,
  OK,
  TOO_LITTLE,
  WAY_TOO_LITTLE
}

export type ComponentCategory =
  'macronutrient' | 'element' | 'vitamin';

export type ComponentName =
  'Vitamin A' | 'Vitamin B6' | 'Vitamin B12' | 'Vitamin C' | 'Vitamin D' | 'Vitamin E' |
  'Wasser' | 'Kohlenhydrate' | 'Ballaststoffe' | 'Protein' |
  'Kalzium' | 'Eisen' | 'Magnesium' | 'Phosphor' | 'Zink' | 'Natrium' | 'Chlorid' | 'Kalium';

export const WAY_TOO_MUCH = 1.5;
export const TOO_MUCH = 1.2;
export const TOO_LITTLE = 0.8;
export const WAY_TOO_LITTLE = 0.5;
