import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DietPlanDTO } from './dto/diet-plan.dto';
import { DietPlanModel } from './model/diet-plan.model';
import { DietPlanTrackModel } from './model/diet-plan-track.model';
import { MacrosDTO } from './dto/macros.dto';
import { MetricsModel } from './model/metrics.model';
import { DietPlanOverviewModel } from './model/diet-plan-overview.model';

@Injectable({
  providedIn: 'root',
})
export class DietPlanService {
  basePath = '/diet-plan';

  constructor(private http: HttpClient) {}

  getAllDietPlans() {
    return this.http.get<DietPlanModel[]>(`${this.basePath}/list`);
  }

  getDietPlan() {
    return this.http.get<DietPlanModel>(this.basePath);
  }

  createDietPlan(dietPlanDTO: DietPlanDTO) {
    return this.http.post<DietPlanModel>(this.basePath, dietPlanDTO);
  }

  addWeight(dietPlanId: string, weight: number) {
    return this.http.post<DietPlanTrackModel>(
      `${this.basePath}/add-weight/${dietPlanId}`,
      weight,
    );
  }

  getDietPlanTrackById(dietPlanTrackId: string) {
    return this.http.get<DietPlanTrackModel>(
      `${this.basePath}/track/${dietPlanTrackId}`,
    );
  }

  getDietPlanTrack(dietPlanId: string) {
    return this.http.get<DietPlanTrackModel>(
      `${this.basePath}/track/plan/${dietPlanId}`,
    );
  }

  updateMacros(dietPlanId: string, category: string, macros: MacrosDTO) {
    return this.http.post<DietPlanTrackModel>(
      `${this.basePath}/${category}/${dietPlanId}`,
      macros,
    );
  }

  getMetrics() {
    return this.http.get<MetricsModel>(`${this.basePath}/metrics`);
  }

  isThereAnyActivePlans() {
    return this.http.get<boolean>(`${this.basePath}/active-plans`);
  }

  getDietPlanOverview(id: string) {
    return this.http.get<DietPlanOverviewModel[]>(
      `${this.basePath}/overview/${id}`,
    );
  }
}
