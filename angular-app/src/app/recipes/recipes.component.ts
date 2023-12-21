import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbCarouselConfig,} from '@ng-bootstrap/ng-bootstrap';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit,OnDestroy {

  
  popularRecipes = []

  sectionRecipes = []

  public recipes: Recipes[] = []
  public topRecipes: Recipes[] = []

  private destroyed$ = new Subject();
 
  

 
  
  
  constructor(private recipesService:RecipesService, private carouselConfig: NgbCarouselConfig, private http:HttpClient) {
    carouselConfig.interval = 5000; // Carousel interval in milliseconds
    carouselConfig.wrap = true; // Wrap the carousel items
    carouselConfig.keyboard = true; // Allow keyboard navigation
  }
  
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit() {
    //Make an HTTP call to fetch recipes from the server
    this.recipesService.getLatestRecipes().pipe(takeUntil(this.destroyed$))
    .subscribe(
      (dataRecipes:any) => {
        this.recipes = dataRecipes.payload.recipes
      }
    )

    this.recipesService.getPopularRecipes().pipe(takeUntil(this.destroyed$)).subscribe(
      (dataRecipes:any) => {
        this.topRecipes = dataRecipes.payload.recipes
      }
      )
    }
    
    
  

    


  
}
