import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {  Reviews } from '../models/reviews.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  Review_URL = "http://localhost:3000/api/reviews/"

  constructor(private http: HttpClient) { }


  getReviews(recipeId: string): Observable<Reviews[]>{
    return this.http.get<Reviews[]>(this.Review_URL + recipeId)
  }

  addReview(review: Reviews, recipeId: string): Observable<any>{
    return this.http.post<any>(this.Review_URL + recipeId,review )
  }
}
