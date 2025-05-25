import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DietPlanFormComponent } from './diet-planner/diet-plan-form/diet-plan-form.component';
import { DietPlansListComponent } from './diet-planner/diet-plans-list/diet-plans-list.component';
import { DietPlanComponent } from './diet-planner/diet-plan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AIFoodSuggestComponent } from './diet-planner/ai-food-suggest/ai-food-suggest.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
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
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    component: DietPlanComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'meals',
    component: AIFoodSuggestComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'diet-plans',
    component: DietPlansListComponent,
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
    redirectTo: 'not-found',
  },
];
