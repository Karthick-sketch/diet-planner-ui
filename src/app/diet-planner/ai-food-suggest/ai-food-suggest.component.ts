import {
  Component,
  EmbeddedViewRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AIFoodSuggestModel } from './model/ai-food-suggest.model';
import { AIFoodSuggestService } from './ai-food-suggest.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-ai-food-suggest',
  templateUrl: './ai-food-suggest.component.html',
  styleUrl: './ai-food-suggest.component.css',
  imports: [HeaderComponent],
})
export class AIFoodSuggestComponent {
  aiFoodSuggests!: AIFoodSuggestModel[];

  embeddedViewRef: EmbeddedViewRef<any> | undefined;

  @ViewChild('suggestFoodWindow')
  suggestFoodWindow!: TemplateRef<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private aiFoodSuggestService: AIFoodSuggestService,
  ) {}

  suggestFood() {
    this.aiFoodSuggestService
      .suggestFoods()
      .subscribe((aiFoodSuggestModel: AIFoodSuggestModel[]) => {
        this.aiFoodSuggests = aiFoodSuggestModel;
        this.openSuggestFoodWindow();
      });
  }

  openSuggestFoodWindow() {
    this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(
      this.suggestFoodWindow,
      { suggestFoods: this.aiFoodSuggests },
    );
  }
}
