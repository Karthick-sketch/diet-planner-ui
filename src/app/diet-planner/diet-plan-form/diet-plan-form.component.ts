import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DropdownModel } from '../../shared/model/dropdown.model';
import { TimePeriodDTO } from '../dto/time-period.dto';
import { DietPlanDTO } from '../dto/diet-plan.dto';
import { Gender } from '../enum/gender.enum';
import { Goal } from '../enum/goal.enum';
import { Activity } from '../enum/activity.enum';
import { FoodType } from '../enum/food-type.enum';
import { DietPlanService } from '../diet-plan-service';

@Component({
  selector: 'app-diet-plan-form',
  templateUrl: './diet-plan-form.component.html',
  styleUrl: './diet-plan-form.component.css',
  imports: [FormsModule],
})
export class DietPlanFormComponent implements OnInit {
  dietPlanDTO!: DietPlanDTO;
  timePeriodDTO!: TimePeriodDTO;

  foodFilters = '';

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
    private router: Router,
    private dietPlanService: DietPlanService
  ) {}

  ngOnInit() {
    this.dietPlanDTO = new DietPlanDTO();
    this.timePeriodDTO = new TimePeriodDTO();
  }

  private navigateToHome() {
    this.router.navigate(['/']);
  }

  cancel() {
    this.navigateToHome();
  }

  addDietPlan() {
    if (this.validateFields()) {
      this.dietPlanDTO.timePeriod = this.timePeriodDTO;
      this.dietPlanDTO.foodFilters = [this.foodFilters];
      this.dietPlanService.addDietPlan(this.dietPlanDTO).subscribe();
      this.navigateToHome();
    } else {
      console.log(this.dietPlanDTO);
    }
  }

  private validateFields() {
    return (
      this.dietPlanDTO.age &&
      this.dietPlanDTO.title &&
      this.dietPlanDTO.description &&
      this.dietPlanDTO.height &&
      this.dietPlanDTO.gender &&
      this.dietPlanDTO.weight &&
      this.dietPlanDTO.goal &&
      this.dietPlanDTO.finalGoal &&
      this.dietPlanDTO.activity &&
      this.dietPlanDTO.foodType &&
      this.timePeriodDTO.duration &&
      this.timePeriodDTO.timestamp
    );
  }
}
