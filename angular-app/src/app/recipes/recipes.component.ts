import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  popularRecipes = []

  sectionRecipes = []

  public recipes: Recipes[] = []
  public topRecipes: Recipes[] = []
 
  

 
  
  
  constructor(private recipesService:RecipesService, private carouselConfig: NgbCarouselConfig, private http:HttpClient) {
    carouselConfig.interval = 5000; // Carousel interval in milliseconds
    carouselConfig.wrap = true; // Wrap the carousel items
    carouselConfig.keyboard = true; // Allow keyboard navigation
  }

  ngOnInit() {
    //Make an HTTP call to fetch recipes from the server
    this.recipesService.getLatestRecipes()
    .subscribe(
      (dataRecipes:any) => {
        console.log('getLatest',dataRecipes.payload.recipes)
        this.recipes = dataRecipes.payload.recipes
      }
    )

    this.recipesService.getPopularRecipes().subscribe(
      (dataRecipes:any) => {
        console.log('getPopular',dataRecipes.payload.recipes)
        this.topRecipes = dataRecipes.payload.recipes
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
