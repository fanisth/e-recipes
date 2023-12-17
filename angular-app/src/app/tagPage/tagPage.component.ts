import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service' 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tagPage-catalogue',
  templateUrl: './tagPage.component.html',
  styleUrls: ['./tagPage.component.css']
})
export class TagPageComponent implements OnInit {

  public recipes: Recipes[] = []

  constructor(private route: ActivatedRoute, private recipesService:RecipesService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tagQuery = params['tag'];

      this.recipesService.getTagResults(tagQuery)
      .subscribe(
        (dataRecipes:any) => {
          console.log('allRecipes',dataRecipes.payload.recipes)
          this.recipes = dataRecipes.payload.recipes
        }
      )
    });

  }
}
