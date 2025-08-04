import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DietPlanService } from '../diet-plan-service';
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

  plans = [
    new DropdownModel('Weight Loss', Plan.WEIGHT_LOSS),
    new DropdownModel('Weight Gain', Plan.WEIGHT_GAIN),
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
  selected = {
    plan: Plan.WEIGHT_LOSS,
    gender: Gender.MALE,
    goal: Goal.MILD,
    activity: Activity.SEDENTARY,
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
      }
    });
  }

  createDietPlan() {
    if (this.validateFields()) {
      this.dietPlanService.createDietPlan(this.mapSelected()).subscribe(() => {
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
      this.dietPlanDTO.duration
    );
  }

  private mapSelected() {
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

  getFinalGoalPlaceholder() {
    let plan =
      this.selected.plan === Plan.WEIGHT_LOSS ? 'weight loss' : 'weight gain';
    return `Target ${plan} in kilograms`;
  }
}
