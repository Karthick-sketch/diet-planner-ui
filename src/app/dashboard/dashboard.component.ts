import { Component, OnInit } from '@angular/core';
import { WeightTrackComponent } from './weight-track/weight-track.component';
import { DietPlanService } from '../diet-planner/diet-plan-service';
import { MetricsModel } from '../diet-planner/model/metrics.model';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [WeightTrackComponent, HeaderComponent],
})
export class DashboardComponent implements OnInit {
  metrics!: MetricsModel;

  constructor(private dietPlanService: DietPlanService) {
    this.metrics = new MetricsModel();
    this.metrics.days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.metrics.weights = [100, 99, 98, 99, 98, 97, 96];
  }

  ngOnInit() {
    this.dietPlanService
      .getMetrics()
      .subscribe((metricsModel: MetricsModel) => {
        this.metrics = metricsModel;
      });
  }
}
