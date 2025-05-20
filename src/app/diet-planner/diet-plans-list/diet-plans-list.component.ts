import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietPlanService } from '../diet-plan-service';
import { DietPlanDTO } from '../dto/diet-plan.dto';
import { DietPlanModel } from '../model/diet-plan.model';

@Component({
  selector: 'app-diet-plans-list',
  templateUrl: './diet-plans-list.component.html',
  styleUrl: './diet-plans-list.component.css',
})
export class DietPlansListComponent implements OnInit {
  dietPlans!: DietPlanModel[];

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
        this.dietPlans = dietPlanModels;
      });
  }

  addDietPlan(dietPlanDTO: DietPlanDTO) {
    this.dietPlanService.addDietPlan(dietPlanDTO).subscribe();
  }

  openDietPlanForm() {
    this.router.navigate(['/diet-plan-form']);
  }
}
