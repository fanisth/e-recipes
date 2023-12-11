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
  // recipes: Recipes[] = [
  //   {
  //     title: 'Recipe 1',
  //     instructions: [
  //       { key: 'step1' , value:[ 'Step 1 instruction'] },
  //       { key: 'step2', value:[ 'Step 2 instruction'] },
  //       // Add more steps as needed
  //     ],
  //     ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
  //     equipment: ['Equipment 1', 'Equipment 2'],
  //     tags: ['Tag 1', 'Tag 2'],
  //     photo_url: '../../assets/taper.jpg',
  //     preperation_time: 30,
  //     cooking_time: 60,
  //     difficulty: 'Intermediate',
  //     rating: {
  //       sum: 40,
  //       counter: 10
  //     }
  //   },
  //   {
  //     title: 'Recipe 2',
  //     instructions: [
  //       { key: 'step1' , value:[ 'Step 11 instruction'] },
  //       { key: 'step2', value:[ 'Step 22 instruction'] },
  //       // Add more steps as needed
  //     ],
  //     ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C'],
  //     equipment: ['Equipment X', 'Equipment Y'],
  //     tags: ['Tag X', 'Tag Y'],
  //     photo_url: '../../assets/taper.jpg',
  //     preperation_time: 45,
  //     cooking_time: 75,
  //     difficulty: 'Advanced',
  //     rating: {
  //       sum: 32,
  //       counter: 10
  //     }
  //   },
  //   {
  //     title: 'Recipe 3',
  //     instructions: [
  //       { key: 'step1' , value:[ 'Step 111 instruction'] },
  //       { key: 'step2', value:[ 'Step 222 instruction'] },
  //       // Add more steps as needed
  //     ],
  //     ingredients: ['Ingredient X', 'Ingredient Y', 'Ingredient Z'],
  //     equipment: ['Equipment A', 'Equipment B'],
  //     tags: ['Tag A', 'Tag B'],
  //     photo_url: '../../assets/taper.jpg',
  //     preperation_time: 60,
  //     cooking_time: 90,
  //     difficulty: 'Beginner',
  //     rating: {
  //       sum: 25,
  //       counter: 10
  //     }
  //   },
  // ];; // Assuming your recipe objects have a structure, adjust accordingly


constructor(private recipeService:RecipesService) {
 
}
  calculateAverageRating(recipe: Recipes): number {
    if (!recipe.rating || recipe.rating.counter === 0) {
      return 0;
    }
    return recipe.rating.sum / recipe.rating.counter;
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
