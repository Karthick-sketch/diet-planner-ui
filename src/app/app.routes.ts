import { Routes } from '@angular/router';
import { DietPlanFormComponent } from './diet-planner/diet-plan-form/diet-plan-form.component';
import { DietPlansListComponent } from './diet-planner/diet-plans-list/diet-plans-list.component';
import { DietPlanComponent } from './diet-planner/diet-plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './user/signup/signup.component';
import { LoginComponent } from './user/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/diet-plans',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'diet-plans',
    component: DietPlansListComponent,
  },
  {
    path: 'diet-plan/:id',
    component: DietPlanComponent,
  },
  {
    path: 'diet-plan-form',
    component: DietPlanFormComponent,
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
