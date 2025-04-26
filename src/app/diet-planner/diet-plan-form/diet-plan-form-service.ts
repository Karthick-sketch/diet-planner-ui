import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DietPlanModel } from '../model/diet-plan.model';

@Injectable({
  providedIn: 'root',
})
export class DietPlanFormService {
  constructor(private http: HttpClient) {}

  addDietPlan(dietPlan: DietPlanModel) {
    return this.http.post<void>('/diet-planner', dietPlan);
  }
}
