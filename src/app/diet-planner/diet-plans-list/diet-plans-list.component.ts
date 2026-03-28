import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DietPlanService } from '../diet-plan-service';
import { DietPlanModel } from '../model/diet-plan.model';
import { Plan } from '../enum/plan.enum';

@Component({
  selector: 'app-diet-plans-list',
  templateUrl: './diet-plans-list.component.html',
  styleUrl: './diet-plans-list.component.css',
  imports: [NgTemplateOutlet, RouterLink],
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
