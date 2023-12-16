import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service' 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'searchResults-catalogue',
  templateUrl: './searchResults.component.html',
  styleUrls: ['./searchResults.component.css']
})
export class searchResultsComponent implements OnInit {

  public recipes: Recipes[] = []

  constructor(private route: ActivatedRoute, private recipesService:RecipesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchQuery = params['query'];
      console.log('Search query:', searchQuery);

      this.recipesService.getSearchResults(searchQuery)
      .subscribe(
        (dataRecipes:any) => {
          console.log('allRecipes',dataRecipes.payload.recipes)
          this.recipes = dataRecipes.payload.recipes
        }
      )
    });
    
  }
}
