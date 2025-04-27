import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DietPlanModel } from './model/diet-plan.model';
import { DietPlannerService } from './diet-planner-service';
import { DietPlanDTO } from './dto/diet-plan.dto';

@Component({
  selector: 'app-diet-planner',
  templateUrl: './diet-planner.component.html',
  styleUrl: './diet-planner.component.css',
})
export class DietPlannerComponent implements OnInit {
  dietPlan!: DietPlanModel;

  constructor(private dietPlannerService: DietPlannerService) {}

  ngOnInit() {}
}
