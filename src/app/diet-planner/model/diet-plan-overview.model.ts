import { CaloriesDTO } from '../dto/calories.dto';

export class DietPlanOverviewModel {
  id!: string;
  weight!: number;
  tdee!: number;
  deficit!: CaloriesDTO;
  protein!: CaloriesDTO;
  carbs!: CaloriesDTO;
  fat!: CaloriesDTO;
  date!: Date;
}
