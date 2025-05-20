import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DietPlanDTO } from './dto/diet-plan.dto';
import { DietPlanModel } from './model/diet-plan.model';
import { DietPlanTrackModel } from './model/diet-plan-tracker.model';
import { MacrosDTO } from './dto/macros.dto';

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

  addWeight(dietPlanId: string, weight: number) {
    return this.http.post<DietPlanTrackModel>(
      `${this.basePath}/add-weight/${dietPlanId}`,
      weight,
    );
  }

  getDietPlanTrack(dietPlanId: string) {
    return this.http.get<DietPlanTrackModel>(
      `${this.basePath}/track/${dietPlanId}`,
    );
  }

  addMealKcal(dietPlanId: string, category: string, macros: MacrosDTO) {
    return this.http.post<DietPlanTrackModel>(
      `${this.basePath}/${category}/${dietPlanId}`,
      macros,
    );
  }
}
