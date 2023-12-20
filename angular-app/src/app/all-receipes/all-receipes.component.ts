import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../models/recipes.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-all-receipes',
  templateUrl: './all-receipes.component.html',
  styleUrls: ['./all-receipes.component.css']
})
export class AllReceipesComponent implements OnInit,OnDestroy {

  constructor(private recipesService:RecipesService) { }
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
  public recipes: Recipes[] = []

  private destroyed$ = new Subject();
  ngOnInit(): void {
    this.recipesService.getRecipes().pipe(takeUntil(this.destroyed$))
    .subscribe(
      (dataRecipes:any) => {
        
        this.recipes = dataRecipes.payload.recipes
      }
    )
  }

}
