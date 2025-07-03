import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { DietPlanService } from '../diet-plan-service';
import { DietPlanDTO } from '../dto/diet-plan.dto';
import { DietPlanModel } from '../model/diet-plan.model';
import { Plan } from '../enum/plan.enum';

@Component({
  selector: 'app-diet-plans-list',
  templateUrl: './diet-plans-list.component.html',
  styleUrl: './diet-plans-list.component.css',
  imports: [NgTemplateOutlet],
})
export class DietPlansListComponent implements OnInit {
  dietPlans!: DietPlanModel[];
  Plan = Plan;

  constructor(
    private dietPlanService: DietPlanService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllDietPlans();
  }

  getAllDietPlans() {
    this.dietPlanService
      .getAllDietPlans()
      .subscribe((dietPlanModels: DietPlanModel[]) => {
        dietPlanModels.push(dietPlanModels[0]);
        dietPlanModels.push(dietPlanModels[0]);
        dietPlanModels.push(dietPlanModels[0]);
        this.dietPlans = dietPlanModels;
      });
  }

  addDietPlan(dietPlanDTO: DietPlanDTO) {
    this.dietPlanService.createDietPlan(dietPlanDTO).subscribe();
  }

  openDietPlanForm() {
    this.router.navigate(['/diet-plan-form']);
  }
}
