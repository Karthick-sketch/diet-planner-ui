import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DietPlanDTO } from './dto/diet-plan.dto';
import { DietPlanModel } from './model/diet-plan.model';

@Injectable({
  providedIn: 'root',
})
export class DietPlannerService {
  constructor(private http: HttpClient) {}

  getAllDietPlans() {
    return this.http.get<DietPlanModel[]>('/diet-planner');
  }

  addDietPlan(dietPlanDTO: DietPlanDTO) {
    return this.http.post<DietPlanModel>('/diet-planner', dietPlanDTO);
  }
}
