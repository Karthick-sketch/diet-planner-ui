import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DietPlannerService } from '../diet-planner-service';
import { DietPlanDTO } from '../dto/diet-plan.dto';
import { Router } from '@angular/router';
import { DietPlanModel } from '../model/diet-plan.model';

@Component({
  selector: 'app-diet-plans-list',
  templateUrl: './diet-plans-list.component.html',
  styleUrl: './diet-plans-list.component.css',
})
export class DietPlansListComponent implements OnInit {
  dietPlans!: DietPlanModel[];

  constructor(
    private dietPlannerService: DietPlannerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllDietPlans();
  }

  getAllDietPlans() {
    this.dietPlannerService
      .getAllDietPlans()
      .subscribe((dietPlanModels: DietPlanModel[]) => {
        this.dietPlans = dietPlanModels;
      });
  }

  addDietPlan(dietPlanDTO: DietPlanDTO) {
    this.dietPlannerService.addDietPlan(dietPlanDTO).subscribe();
  }

  openDietPlanForm() {
    this.router.navigate(['/diet-plan-form']);
  }
}
