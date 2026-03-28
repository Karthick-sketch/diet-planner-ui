import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DietPlanService } from '../diet-plan-service';
import { Plan } from '../enum/plan.enum';
import { DietPlanHistoryDTO } from '../dto/diet-plan-history.dto';

@Component({
  selector: 'app-no-active-diet-plan',
  templateUrl: './no-active-diet-plan.component.html',
  styleUrl: './no-active-diet-plan.component.css',
  imports: [RouterLink],
})
export class NoActiveDietPlanComponent implements OnInit {
  pastPlan: DietPlanHistoryDTO | null = null;
  Plan = Plan;

  constructor(private dietPlanService: DietPlanService) {}

  ngOnInit(): void {
    this.dietPlanService.getPastDietPlan().subscribe((data) => {
      if (data) {
        this.pastPlan = data;
      }
    });
  }

  getPlan(plan: Plan) {
    return plan === Plan.WEIGHT_LOSS ? 'Weight Loss' : 'Weight Gain';
  }
}
