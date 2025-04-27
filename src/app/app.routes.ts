import { Routes } from '@angular/router';
import { DietPlannerComponent } from './diet-planner/diet-planner.component';
import { DietPlanFormComponent } from './diet-planner/diet-plan-form/diet-plan-form.component';
import { DietPlansListComponent } from './diet-planner/diet-plans-list/diet-plans-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/diet-plans',
    pathMatch: 'full',
  },
  {
    path: 'diet-plans',
    component: DietPlansListComponent,
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
