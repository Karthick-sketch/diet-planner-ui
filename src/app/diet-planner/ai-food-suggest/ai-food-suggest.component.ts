import { Component, OnInit } from '@angular/core';
import { AIFoodSuggestModel } from './model/ai-food-suggest.model';
import { AIFoodSuggestService } from './ai-food-suggest.service';
import { FilterDto } from './dto/filter.dto';

@Component({
  selector: 'app-ai-food-suggest',
  templateUrl: './ai-food-suggest.component.html',
  styleUrl: './ai-food-suggest.component.css',
})
export class AIFoodSuggestComponent implements OnInit {
  filters = {
    mealFilters: ['Breakfast', 'Lunch', 'Snack', 'Dinner'],
    foodFilters: ['Vegetarian', 'Non-vegetarian', 'Low-carb'],
  };
  selected: FilterDto = { mealFilter: 'Breakfast', foodFilter: 'Vegetarian' };

  aiFoodSuggests!: AIFoodSuggestModel[];

  constructor(private aiFoodSuggestService: AIFoodSuggestService) {}

  ngOnInit() {
    this.suggest();
  }

  addMealFilter(filter: string) {
    this.selected.mealFilter = filter;
  }

  addFoodFilter(filter: string) {
    this.selected.foodFilter = filter;
  }

  suggest() {
    this.aiFoodSuggestService
      .suggestFoods(this.selected)
      .subscribe((aiFoodSuggestModel: AIFoodSuggestModel[]) => {
        this.aiFoodSuggests = aiFoodSuggestModel;
      });
  }
}
