import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { Activity } from '../enum/activity.enum';
import { FoodType } from '../enum/food-type.enum';
import { TimePeriodDTO } from '../dto/time-period.dto';

export class DietPlanModel {
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
