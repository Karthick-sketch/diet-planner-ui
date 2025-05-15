import {
  Component,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DietPlanService } from './diet-plan-service';
import { DietPlanModel } from './model/diet-plan.model';
import { DietPlanTrackModel } from './model/diet-plan-tracker.model';
import { MealKcalDTO } from './dto/meal-kcal.dto';
import { MacrosDTO } from './dto/macros.dto';
import { MealCategoriesConstants } from './constants/meal-categories.constants';

@Component({
  selector: 'app-diet-plan',
  templateUrl: './diet-plan.component.html',
  styleUrl: './diet-plan.component.css',
  imports: [NgTemplateOutlet, FormsModule],
})
export class DietPlanComponent implements OnInit {
  dietPlan!: DietPlanModel;
  dietPlanTrack!: DietPlanTrackModel;
  meals!: MealKcalDTO;
  kcalPercentage!: number;

  @ViewChild('addKcalWindow')
  addKcalWindow!: TemplateRef<any>;

  private embeddedViewRef: EmbeddedViewRef<any> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private viewContainerRef: ViewContainerRef,
    private dietPlanService: DietPlanService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.dietPlanService.getDietPlan(id).subscribe({
          next: (dietPlanModel: DietPlanModel) => {
            this.dietPlan = dietPlanModel;
            this.dietPlanService.getDietPlanTrack(dietPlanModel.id).subscribe({
              next: (dietPlanTrackModel: DietPlanTrackModel) => {
                this.dietPlanTrack = dietPlanTrackModel;
                this.meals = dietPlanTrackModel.mealKcal;
                this.setKcalPercentage();
              },
              error: (err) => {
                if (err.status === 404) {
                  this.router.navigate(['/not-found']);
                }
              },
            });
          },
          error: (err) => {
            if (err.status === 404) {
              this.router.navigate(['/not-found']);
            }
          },
        });
      } else {
        this.router.navigate(['/not-found']);
      }
    });
  }

  openAddKcalWindow(category: string) {
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.addKcalWindow,
      {
        category: category,
        macros: this.getByCategory(category.toLowerCase()),
      },
    );
  }

  private getByCategory(category: string) {
    let macros = undefined;
    if (category === MealCategoriesConstants.BREAKFAST) {
      macros = this.meals.breakfast;
    } else if (category === MealCategoriesConstants.LUNCH) {
      macros = this.meals.lunch;
    } else if (category === MealCategoriesConstants.SNACK) {
      macros = this.meals.snack;
    } else if (category === MealCategoriesConstants.DINNER) {
      macros = this.meals.dinner;
    }
    return macros;
  }

  closeAddKcalWindow() {
    this.viewContainerRef.clear();
    this.embeddedViewRef = undefined;
  }

  updateKcal(category: string, macros: MacrosDTO) {
    this.dietPlanService
      .updateMacros(this.dietPlan.id, category.toLowerCase(), macros)
      .subscribe((dietPlanTrackModel: DietPlanTrackModel) => {
        this.dietPlanTrack = dietPlanTrackModel;
        this.meals = dietPlanTrackModel.mealKcal;
        this.setKcalPercentage();
      });
    this.closeAddKcalWindow();
  }

  addWeight() {
    this.dietPlanService
      .addWeight(this.dietPlan.id, this.dietPlanTrack.weight)
      .subscribe((dietPlanTrackModel: DietPlanTrackModel) => {
        this.dietPlanTrack = dietPlanTrackModel;
        this.meals = dietPlanTrackModel.mealKcal;
        this.setKcalPercentage();
      });
  }

  setKcalPercentage() {
    this.kcalPercentage = this.dietPlanTrack.deficit.taken / this.dietPlanTrack.deficit.total * 100;
  }
}
