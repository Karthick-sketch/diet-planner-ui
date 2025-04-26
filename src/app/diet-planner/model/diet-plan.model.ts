import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { TimePeriodModel } from './time-period.model';
import { Activity } from '../enum/activity.enum';
import { FoodType } from '../enum/food-type.enum';

export class DietPlanModel {
  id!: string;
  age!: number;
  gender!: Gender;
  height!: number;
  weight!: number;
  goal!: Goal;
  finalGoal!: number;
  timePeriod!: TimePeriodModel;
  activity!: Activity;
  foodType!: FoodType;
  foodFilters!: string[];
}
