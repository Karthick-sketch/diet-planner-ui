import { Component, OnInit } from '@angular/core';
import { DietPlanModel } from '../model/diet-plan.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DietPlanFormService } from './diet-plan-form-service';
import { DropdownModel } from '../../shared/model/dropdown.model';
import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { Activity } from '../enum/activity.enum';
import { FoodType } from '../enum/food-type.enum';
import { TimePeriodModel } from '../model/time-period.model';

@Component({
  selector: 'app-diet-plan-form',
  templateUrl: './diet-plan-form.component.html',
  styleUrl: './diet-plan-form.component.css',
  imports: [FormsModule],
})
export class DietPlanFormComponent implements OnInit {
  dietPlan!: DietPlanModel;
  timePeriod!: TimePeriodModel;

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
  foodTypes = [
    new DropdownModel('Vegetarian', FoodType.VEGETARIAN),
    new DropdownModel('Non-vegetarian', FoodType.NON_VEGETARIAN),
    new DropdownModel('Vegan', FoodType.VEGAN),
  ];

  constructor(
    private dietPlanFormService: DietPlanFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dietPlan = new DietPlanModel();
    this.timePeriod = new TimePeriodModel();
  }

  private navigateToHome() {
    this.router.navigate(['/']);
  }

  cancel() {
    this.navigateToHome();
  }

  addDietPlan() {
    if (this.validateFields()) {
      this.dietPlanFormService.addDietPlan(this.dietPlan).subscribe();
      this.navigateToHome();
    }
  }

  private validateFields() {
    return (
      this.dietPlan.age &&
      this.dietPlan.height &&
      this.dietPlan.gender &&
      this.dietPlan.weight &&
      this.dietPlan.goal &&
      this.dietPlan.finalGoal &&
      this.dietPlan.timePeriod &&
      this.dietPlan.activity &&
      this.dietPlan.foodType &&
      this.dietPlan.foodFilters
    );
  }
}
