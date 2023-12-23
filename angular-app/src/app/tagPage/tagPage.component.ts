import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'tagPage-catalogue',
  templateUrl: './tagPage.component.html',
  styleUrls: ['./tagPage.component.css']
})
export class TagPageComponent implements OnInit,OnDestroy {

  public recipes: Recipes[] = []
  public tagName: string = '';
  private destroyed$ = new Subject();

  constructor(private route: ActivatedRoute, private recipesService:RecipesService, private router:Router) { }
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const tagQuery = params['tag'];

    if(!tagQuery){
      this.router.navigate([''])
    }
      this.recipesService.getTagResults(tagQuery).pipe(takeUntil(this.destroyed$))
      .subscribe(
        (dataRecipes:any) => {
          this.recipes = dataRecipes.payload.recipes
          this.tagName = tagQuery
        }
      )
    });

  }
}
