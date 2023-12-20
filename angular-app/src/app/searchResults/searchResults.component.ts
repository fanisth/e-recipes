import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service' 
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'searchResults-catalogue',
  templateUrl: './searchResults.component.html',
  styleUrls: ['./searchResults.component.css']
})
export class searchResultsComponent implements OnInit,OnDestroy {

  public recipes: Recipes[] = []
  private destroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private recipesService:RecipesService) { }
  
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['query'];

      this.recipesService.getSearchResults(searchQuery).pipe(takeUntil(this.destroyed$))
      .subscribe(
        (dataRecipes:any) => {
          this.recipes = dataRecipes.payload.recipes
        }
      )
    });
    
  }
}
