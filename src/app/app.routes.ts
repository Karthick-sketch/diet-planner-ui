import { Routes } from '@angular/router';
import { DietPlanFormComponent } from './diet-planner/diet-plan-form/diet-plan-form.component';
import { DietPlansListComponent } from './diet-planner/diet-plans-list/diet-plans-list.component';
import { DietPlanComponent } from './diet-planner/diet-plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';

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
    canActivate: [AuthGuard],
  },
  {
    path: 'diet-plan/:id',
    component: DietPlanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diet-plan-form',
    component: DietPlanFormComponent,
    canActivate: [AuthGuard],
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
