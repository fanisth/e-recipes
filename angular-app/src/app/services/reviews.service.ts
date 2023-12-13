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


  getReviews(reviewId: string): Observable<Reviews[]>{
    return this.http.get<Reviews[]>(this.Review_URL + reviewId)
  }
}
