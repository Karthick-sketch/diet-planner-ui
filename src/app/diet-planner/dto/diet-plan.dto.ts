import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { TimePeriodDTO } from './time-period.dto';
import { Activity } from '../enum/activity.enum';
import { Plan } from '../enum/plan.enum';

export class DietPlanDTO {
  id!: string;
  title!: string;
  plan!: Plan;
  age!: number;
  gender!: Gender;
  height!: number;
  weight!: number;
  goal!: Goal;
  finalGoal!: number;
  timePeriod!: TimePeriodDTO;
  activity!: Activity;
}
