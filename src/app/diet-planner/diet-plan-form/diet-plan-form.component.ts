import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DietPlanService } from '../diet-plan-service';
import { TimePeriodDTO } from '../dto/time-period.dto';
import { DietPlanDTO } from '../dto/diet-plan.dto';
import { Plan } from '../enum/plan.enum';
import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { Activity } from '../enum/activity.enum';
import { DropdownModel } from '../../shared/model/dropdown.model';

@Component({
  selector: 'app-diet-plan-form',
  templateUrl: './diet-plan-form.component.html',
  styleUrl: './diet-plan-form.component.css',
  imports: [FormsModule],
})
export class DietPlanFormComponent implements OnInit {
  dietPlanDTO!: DietPlanDTO;
  timePeriodDTO!: TimePeriodDTO;

  plans = [
    new DropdownModel('Weight Loss', Plan.WEIGHT_LOSS),
    new DropdownModel('Weight Gain', Plan.WEIGHT_GAIN),
    new DropdownModel('Muscle Gain', Plan.MUSCLE_GAIN),
  ];
  genders = [
    new DropdownModel('Male', Gender.MALE),
    new DropdownModel('Female', Gender.FEMALE),
  ];
  goals = [
    new DropdownModel('Mild', Goal.MILD),
    new DropdownModel('Moderate', Goal.MODERATE),
    new DropdownModel('Aggressive', Goal.AGGRESSIVE),
  ];
  activities = [
    new DropdownModel('Sedentary', Activity.SEDENTARY),
    new DropdownModel('Light', Activity.LIGHT),
    new DropdownModel('Moderate', Activity.MODERATE),
    new DropdownModel('Hard', Activity.HARD),
    new DropdownModel('Athlete', Activity.ATHLETE),
  ];
  timestamps = ['Days', 'Weeks', 'Months'];
  selected = {
    plan: Plan.WEIGHT_LOSS,
    gender: Gender.MALE,
    goal: Goal.MILD,
    activity: Activity.SEDENTARY,
    timestamp: 'Days',
  };

  constructor(
    private router: Router,
    private dietPlanService: DietPlanService,
  ) {}

  ngOnInit() {
    this.dietPlanService.isThereAnyActivePlans().subscribe((value) => {
      if (value) {
        this.router.navigate(['/']);
      } else {
        this.dietPlanDTO = new DietPlanDTO();
        this.timePeriodDTO = new TimePeriodDTO();
      }
    });
  }

  createDietPlan() {
    if (this.validateFields()) {
      this.dietPlanService
        .createDietPlan(this.mapSelected())
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    } else {
      console.log(this.dietPlanDTO);
    }
  }

  private validateFields() {
    return (
      this.dietPlanDTO.age &&
      this.dietPlanDTO.title &&
      this.dietPlanDTO.height &&
      this.dietPlanDTO.weight &&
      this.dietPlanDTO.finalGoal &&
      this.timePeriodDTO.duration
    );
  }

  private mapSelected() {
    this.timePeriodDTO.timestamp = this.selected.timestamp;
    this.dietPlanDTO.timePeriod = this.timePeriodDTO;
    this.dietPlanDTO.plan = this.selected.plan;
    this.dietPlanDTO.gender = this.selected.gender;
    this.dietPlanDTO.goal = this.selected.goal;
    this.dietPlanDTO.activity = this.selected.activity;
    return this.dietPlanDTO;
  }

  selectDietPlan(plan: Plan) {
    this.selected.plan = plan;
  }

  selectGender(gender: Gender) {
    this.selected.gender = gender;
  }

  selectGoal(goal: Goal) {
    this.selected.goal = goal;
  }

  selectActivity(activity: Activity) {
    this.selected.activity = activity;
  }

  selectTimestamp(timestamp: string) {
    this.selected.timestamp = timestamp;
  }

  getFinalGoalPlaceholder() {
    let plan = 'weight loss';
    if (this.selected.plan === Plan.WEIGHT_GAIN) {
      plan = 'weight gain';
    } else if (this.selected.plan === Plan.MUSCLE_GAIN) {
      plan = 'muscle gain';
    }
    return `Target ${plan} in kilograms`;
  }
}
