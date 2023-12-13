import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { categories } from '../models/categories.model';
import {  Recipes } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';
import { PostRecipes } from '../models/postRecipes.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  Categories_URL = "http://localhost:3000/api"
  Recipe_URL = "http://localhost:3000/api/recipes"

  constructor(private http: HttpClient) { }

  // getCategories(): Observable<categories[]>{
  //   return this.http.get<categories[]>(this.Categories_URL + '/categories' )
  // }

  getRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL)
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
    return this.http.get<Recipes[]>(this.Recipe_URL + '/userRecipes' )
  }

  getRecipeCategories(categoryId:string): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/recipes/categories/' + categoryId )
  }


  addReceipe(recipe : any): Observable<any>{
    return this.http.post<any>(this.Recipe_URL ,recipe )
  }

  getCategories(): Observable<any[]> {
    return this.http.get<categories[]>(this.Categories_URL + '/categories').pipe(
      map((receivedData: any) => {
        const transformedData: any[] = [];
        const payload: categories[] = receivedData.payload.data;

        //console.log('######', receivedData)
        // Helper function to find a category by ID
        
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
          console.log(transformedData);
          payload.forEach((category:categories) => {
               // Subcategory 
               if (category.parentCategory != null) {
                
                const parentIndex = transformedData.findIndex(cat => cat.id == category.parentCategory);
                if (parentIndex != -1) {
                  console.log(transformedData[parentIndex])
                    transformedData[parentIndex].subCategory.push(category);
                }
               }
          })
        return transformedData;
      })
    );
  }

}
