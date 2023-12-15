import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipes } from '../models/recipes.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  param :string 

  public recipes:Recipes[] =[];


  constructor(private router:ActivatedRoute, private recipeService:RecipesService) {
    
    this.param = this.router.snapshot.params['id'];
    console.log('param', this.param)
   }

  
  ngOnInit(): void {
    this.recipeService.getRecipeCategories(this.param).subscribe((recipes:any) =>{
      this.recipes = recipes.payload.recipes
      
      console.log(']]]]]]',recipes.payload.recipes)
    })
  }

}
