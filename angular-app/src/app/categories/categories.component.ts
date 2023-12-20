import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../models/recipes.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  param :string 

  public recipes:Recipes[] =[];

  private destroyed$ = new Subject();

  constructor(private router:ActivatedRoute, private recipeService:RecipesService) {
    
    this.param = this.router.snapshot.params['id'];
   }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  
  ngOnInit(): void {
    this.recipeService.getRecipeCategories(this.param).pipe(takeUntil(this.destroyed$)).subscribe((recipes:any) =>{
      this.recipes = recipes.payload.recipes
    
    })
  }

}
