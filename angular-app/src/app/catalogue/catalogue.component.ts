import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service' 

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  @Input() previousRoute :string =''

  @Input() myRecipes :Recipes[] = []
  popularRecipes = []

  sectionRecipes = []

  public recipes: Recipes[] = []
 


constructor(private recipeService:RecipesService) {
 
}
  calculateAverageRating(recipe: Recipes): number {
    if (!recipe.rating || recipe.rating.counter === 0) {
      return 0;
    }
    return Math.round((recipe.rating.sum / recipe.rating.counter) * 10) / 10;
  }

  ngOnInit() {

    console.log(' my recipes',this.myRecipes)
    // Make an HTTP call to fetch recipes from the server
    if(this.previousRoute == "home"){
      this.recipeService.getRecipes().subscribe(
        (dataRecipes:any) => {
          console.log('catalogue', dataRecipes)
          this.recipes = dataRecipes.payload.recipes
        }
      )
    }
    

     //this.recipesService.getPopularRecipes().subscribe(
    //   (dataRecipes:Recipes[]) => {
    //   this.popularRecipes = dataRecipes
    //   }
    // )

    //this.recipesService.getSectionRecipes().subscribe(
    //   (dataRecipes:Recipes[]) => {
    //   this.sectionRecipes = dataRecipes
    //   }
    // )


  }
}
