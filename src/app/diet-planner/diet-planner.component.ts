import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-diet-planner',
  templateUrl: './diet-planner.component.html',
  styleUrl: './diet-planner.component.css',
})
export class DietPlannerComponent {
  constructor(private router: Router) {}

  openDietPlanForm() {
    this.router.navigate(['/diet-plan-form']);
  }
}
