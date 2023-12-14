import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../models/recipes.model';

@Component({
  selector: 'app-all-receipes',
  templateUrl: './all-receipes.component.html',
  styleUrls: ['./all-receipes.component.css']
})
export class AllReceipesComponent implements OnInit {

  constructor(private recipesService:RecipesService) { }
  public recipes: Recipes[] = []

  ngOnInit(): void {
    this.recipesService.getRecipes()
    .subscribe(
      (dataRecipes:any) => {
        console.log('allRecipes',dataRecipes.payload.recipes)
        this.recipes = dataRecipes.payload.recipes
      }
    )
  }

}
