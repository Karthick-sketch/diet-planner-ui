import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AIFoodSuggestModel } from './model/ai-food-suggest.model';

@Injectable({
  providedIn: 'root',
})
export class AIFoodSuggestService {
  constructor(private httpClient: HttpClient) {}

  suggestFoods() {
    return this.httpClient.get<AIFoodSuggestModel[]>('/ai-food-suggest');
  }
}
