import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  popularRecipes = []

  sectionRecipes = []

  recipes: Recipes[] = [
    {
      title: 'Recipe 1',
      instructions: [
        { key: 'step1' , value:[ 'Step 1 instruction'] },
        { key: 'step2', value:[ 'Step 2 instruction'] },
        // Add more steps as needed
      ],
      ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      equipment: ['Equipment 1', 'Equipment 2'],
      tags: ['Tag 1', 'Tag 2'],
      photos_urls: '../../assets/recipe1.jpg',
      video_url: 'https://www.youtube.com/watch?v=your-video-id',
      preperation_time: 30,
      cooking_time: 60,
      difficulty: 'Intermediate',
    },
    {
      title: 'Recipe 2',
      instructions: [
        { key: 'step1' , value:[ 'Step 11 instruction'] },
        { key: 'step2', value:[ 'Step 22 instruction'] },
        // Add more steps as needed
      ],
      ingredients: ['Ingredient A', 'Ingredient B', 'Ingredient C'],
      equipment: ['Equipment X', 'Equipment Y'],
      tags: ['Tag X', 'Tag Y'],
      photos_urls: '../../assets/recipe2.jpg',
      video_url: 'https://www.youtube.com/watch?v=your-video-id',
      preperation_time: 45,
      cooking_time: 75,
      difficulty: 'Advanced',
    },
    {
      title: 'Recipe 3',
      instructions: [
        { key: 'step1' , value:[ 'Step 111 instruction'] },
        { key: 'step2', value:[ 'Step 222 instruction'] },
        // Add more steps as needed
      ],
      ingredients: ['Ingredient X', 'Ingredient Y', 'Ingredient Z'],
      equipment: ['Equipment A', 'Equipment B'],
      tags: ['Tag A', 'Tag B'],
      photos_urls: '../../assets/recipe3.jpg',
      video_url: 'https://www.youtube.com/watch?v=your-video-id',
      preperation_time: 60,
      cooking_time: 90,
      difficulty: 'Beginner',
    },
  ];; // Assuming your recipe objects have a structure, adjust accordingly

  constructor(private recipesService:RecipesService, private carouselConfig: NgbCarouselConfig) {
    carouselConfig.interval = 5000; // Carousel interval in milliseconds
    carouselConfig.wrap = true; // Wrap the carousel items
    carouselConfig.keyboard = true; // Allow keyboard navigation
  }

  ngOnInit() {
    // Make an HTTP call to fetch recipes from the server
    // this.recipesService.getRecipes().subscribe(
    //   (dataRecipes:Recipes[]) => {
    //     this.recipes = dataRecipes
    //   }
    // )

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
