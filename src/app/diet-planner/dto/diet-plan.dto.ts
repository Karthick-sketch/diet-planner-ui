import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { TimePeriodDTO } from './time-period.dto';
import { Activity } from '../enum/activity.enum';
import { FoodType } from '../enum/food-type.enum';

export class DietPlanDTO {
  id!: string;
  title!: string;
  description!: string;
  age!: number;
  gender!: Gender;
  height!: number;
  weight!: number;
  goal!: Goal;
  finalGoal!: number;
  timePeriod!: TimePeriodDTO;
  activity!: Activity;
  foodType!: FoodType;
  foodFilters!: string[];
}
