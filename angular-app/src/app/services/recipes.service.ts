import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categories } from '../models/categories.model';
import {  Recipes } from '../models/recipes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  Categories_URL = "http://localhost:3000/api/receipt"
  Recipe_URL = "http://localhost:3000/api/receipt"

  constructor(private http: HttpClient) { }

  getCategories(): Observable<categories[]>{
    return this.http.get<categories[]>(this.Categories_URL + '/categories' )
  }

  getRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/recipes' )
  }

  getPopularRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/popularRecipes' )
  }

  getSectionRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/sectionRecipes' )
  }

  getUserRecipes(): Observable<Recipes[]>{
    return this.http.get<Recipes[]>(this.Recipe_URL + '/userRecipes' )
  }


}
