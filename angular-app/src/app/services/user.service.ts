import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserRegistration } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../models/userProfile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly USER_URL = 'http://localhost:3000/api/users'; 


  constructor(private http: HttpClient) { }

  getUserProfile():Observable<UserRegistration>{
    return this.http.get<UserProfile>(this.USER_URL + '/profile')
  }

  updateProfile(user: UserRegistration){
    return this.http.put<UserRegistration>(this.USER_URL + '/profile',user)
  }
}
