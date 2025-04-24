import { Component } from '@angular/core';
import { DietPlannerComponent } from './diet-planner/diet-planner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [DietPlannerComponent],
})
export class AppComponent {}
