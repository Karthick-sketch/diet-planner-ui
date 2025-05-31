import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { Activity } from '../enum/activity.enum';
import { TimePeriodDTO } from '../dto/time-period.dto';
import { Plan } from '../enum/plan.enum';

export class DietPlanModel {
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
