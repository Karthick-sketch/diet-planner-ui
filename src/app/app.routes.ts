import { Routes } from '@angular/router';
import { DietPlannerComponent } from './diet-planner/diet-planner.component';
import { DietPlanFormComponent } from './diet-planner/diet-plan-form/diet-plan-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/diet-planner',
    pathMatch: 'full',
  },
  {
    path: 'diet-planner',
    component: DietPlannerComponent,
  },
  {
    path: 'diet-plan-form',
    component: DietPlanFormComponent,
  },
];
