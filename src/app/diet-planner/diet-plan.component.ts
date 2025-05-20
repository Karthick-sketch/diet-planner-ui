import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgTemplateOutlet} from "@angular/common";
import { DietPlanModel } from './model/diet-plan.model';
import { DietPlanService } from './diet-plan-service';
import { DietPlanTrackModel } from './model/diet-plan-tracker.model';
import {MealKcalDTO} from "./dto/meal-kcal.dto";

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrl: './diet-plan.component.css',
  imports: [NgTemplateOutlet],
})
export class DietPlanComponent {
  dietPlan!: DietPlanModel;
  dietPlanTrack!: DietPlanTrackModel;
  meals!: MealKcalDTO;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dietPlanService: DietPlanService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.dietPlanService.getDietPlan(id).subscribe({
          next: (dietPlanModel: DietPlanModel) => {
            this.dietPlan = dietPlanModel;
            this.dietPlanService.getDietPlanTrack(dietPlanModel.id).subscribe({
              next: (dietPlanTrackModel: DietPlanTrackModel) => {
                this.dietPlanTrack = dietPlanTrackModel;
                this.meals = dietPlanTrackModel.mealKcal;
              },
              error: (err) => {
                if (err.status === 404) {
                  this.router.navigate(['/not-found']);
                }
              },
            });
          },
          error: (err) => {
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            }
          },
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }
}
