import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DietPlanService } from '../diet-plan-service';
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

  constructor(private dietPlanService: DietPlanService) {}

  ngOnInit(): void {
    this.dietPlanService
      .getDietPlansHistory()
      .subscribe((dietPlanModels: DietPlanModel[]) => {
        this.dietPlans = dietPlanModels;
      });
  }
}
