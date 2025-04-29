import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DietPlanDTO } from './dto/diet-plan.dto';
import { DietPlanModel } from './model/diet-plan.model';

@Injectable({
  providedIn: 'root',
})
export class DietPlanService {
  basePath = '/diet-plan';

  constructor(private http: HttpClient) {}

  getAllDietPlans() {
    return this.http.get<DietPlanModel[]>(`${this.basePath}/list`);
  }

  getDietPlan(id: string) {
    return this.http.get<DietPlanModel>(`${this.basePath}/${id}`);
  }

  addDietPlan(dietPlanDTO: DietPlanDTO) {
    return this.http.post<DietPlanModel>(this.basePath, dietPlanDTO);
  }
}
