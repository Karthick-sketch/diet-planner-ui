import { CaloriesDTO } from '../dto/calories.dto';
import { MealKcalDTO } from '../dto/meal-kcal.dto';

export class DietPlanTrackModel {
  id!: string;
  weight!: number;
  tdee!: number;
  deficit!: CaloriesDTO;
  mealKcal!: MealKcalDTO;
  date!: string;
  dietPlanId!: string;
}
