import { Component } from '@angular/core';
import { DietPlanModel } from './model/diet-plan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DietPlanService } from './diet-plan-service';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrl: './diet-plan.component.css',
})
export class DietPlanComponent {
  dietPlan!: DietPlanModel;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dietPlanService: DietPlanService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.dietPlanService.getDietPlan(id).subscribe({
          next: (dietPlanModel: DietPlanModel) => {
            this.dietPlan = dietPlanModel;
          },
          error: (error) => {
            if (error.status === 404) {
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
