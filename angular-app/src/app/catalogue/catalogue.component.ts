import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service' 
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit,OnDestroy {

  @Input() previousRoute :string =''

  @Input() myRecipes :Recipes[] = []
  popularRecipes = []

  sectionRecipes = []

  public recipes: Recipes[] = []
 
  private destroyed$ = new Subject();


constructor(private recipeService:RecipesService) {
 
}
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
  calculateAverageRating(recipe: Recipes): number {
    if (!recipe.rating || recipe.rating.counter === 0) {
      return 0;
    }
    return Math.round((recipe.rating.sum / recipe.rating.counter) * 10) / 10;
  }

  ngOnInit() {

    // Make an HTTP call to fetch recipes from the server
    if(this.previousRoute == "home"){
      this.recipeService.getRecipes().pipe(takeUntil(this.destroyed$)).subscribe(
        (dataRecipes:any) => {
          this.recipes = dataRecipes.payload.recipes
        }
      )
    }
    

  }
}
