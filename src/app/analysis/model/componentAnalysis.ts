import { ComponentName, State, ComponentCategory } from './constants';

export class ComponentAnalysis {
  category: ComponentCategory;
  name: ComponentName;
  currentAmount: number;
  targetAmount: number;
  unit: string;
  state: State;
}
