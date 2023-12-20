import { Injectable } from '@angular/core';
import {  Observable, map } from 'rxjs';
import { categories } from '../models/categories.model';
import { AuthService } from './auth.service';
import {  Recipes } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  Categories_URL = "http://localhost:3000/api"
  Recipe_URL = "http://localhost:3000/api/recipes"

  constructor(private http: HttpClient, private authService: AuthService) { }

  // getCategories(): Observable<categories[]>{
  //   return this.http.get<categories[]>(this.Categories_URL + '/categories' )
  // }


  getRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL)
  }
  getRecipe(recipeId: string): Observable<any> {
    return this.http.get<any>(this.Recipe_URL + `/${recipeId}`).pipe(
      map((recipe) => {
        const currentUserId = this.authService.getUserId();
        if (currentUserId) {
          recipe.permission = recipe.payload.recipe.user_id.toString() === currentUserId.toString() ? 'edit' : 'view';
        } else {
          recipe.permission = 'view';
        }
        return recipe;
      })
    );
  }
  getLatestRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/latest')
  }

  getPopularRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/top-rated' )
  }

  getSectionRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/sectionRecipes' )
  }

  getUserRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/my-recipes' )
  }

  getRecipeCategories(categoryId:string): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/categories/' + categoryId )
  }

  getSearchSuggestions(keyword: string): Observable<Recipes[]> {
    const urlWithParams = `${this.Recipe_URL}/search-suggestions?keyword=${keyword}`;
    return this.http.get<Recipes[]>(urlWithParams);
  }

  getSearchResults(keyword: string): Observable<Recipes[]> {
    const urlWithParams = `${this.Recipe_URL}/search?keyword=${keyword}`;
    return this.http.get<Recipes[]>(urlWithParams);
  }


  getTagResults(keyword: string): Observable<Recipes[]> {
    const urlWithParams = `${this.Recipe_URL}/tags?tag=${keyword}`;
    return this.http.get<Recipes[]>(urlWithParams);
  }

  addReceipe(recipe : any): Observable<any>{
    return this.http.post<any>(this.Recipe_URL ,recipe )
  }

  //Categories tranformation to manipulate and serve them to front
  getCategories(): Observable<any[]> {
    return this.http.get<categories[]>(this.Categories_URL + '/categories').pipe(
      map((receivedData: any) => {
        const transformedData: any[] = [];
        const payload: categories[] = receivedData.payload.data;
        
        payload.forEach((category:categories) => {
          if (!category.parentCategory) {
            // Top-level category
            transformedData.push({
              id: category._id,
              name: category.name,
              type: category.type,
              subCategory: []
            });
          }});
          payload.forEach((category:categories) => {
               // Subcategory 
               if (category.parentCategory != null) {
                
                const parentIndex = transformedData.findIndex(cat => cat.id == category.parentCategory);
                if (parentIndex != -1) {
                    transformedData[parentIndex].subCategory.push(category);
                }
               }
          })
        return transformedData;
      })
    );
  }

}
