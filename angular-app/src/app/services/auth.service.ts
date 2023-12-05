import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ExpirationModalComponent } from '../modals/expiration-modal/expiration-modal.component';
import { UserRegistration } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY = 'token';
  private readonly USERNAME_KEY = 'username';
  private readonly LOGIN_URL = 'http://localhost:3000/api/auth'; 
  private ngbModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
};

private isLoggedInSubject = new BehaviorSubject(false);
public isLoggenIn:Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient,private modalService: NgbModal,private router: Router ) {}

  // Method to save JWT token in session storage
  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  setUsername(token: string): void {
    sessionStorage.setItem(this.USERNAME_KEY, token);
  }

  // Method to retrieve JWT token from session storage
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUsername(): string | null {
    return sessionStorage.getItem(this.USERNAME_KEY);
  }

  //Method to check if the user is logged in
  isUserLoggedIn(): void {
    const token = this.getToken();
    this.isLoggedInSubject.next(token !== null);
  
  }

  // Method to log out the user
  logout(reason:string): void {
    if(reason.includes("expiration")){
      const modalRef = this.modalService.open(ExpirationModalComponent,this.ngbModalOptions);
    modalRef.componentInstance.modalMessage = "Your login session has expired. You should login again";
    modalRef.result.then((result) => {
    });
    }
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USERNAME_KEY);
    this.router.navigate([''])
    
  }

  // Method to authenticate the user and retrieve a JWT token
  login(credentials: { username: string, password: string }): Observable<any> {
    console.log("send loggin")
    return this.http.post(this.LOGIN_URL + '/login', credentials).pipe(
      tap((response:any) => {
        if (response) {
          console.log(response)
          this.isLoggedInSubject.next(true);
          this.setToken(response.payload.data.token);
          this.setUsername(response.payload.data.username);
        }
      })
    );
  }

  register(user : UserRegistration): Observable<any> {
    return this.http.post(this.LOGIN_URL + '/register', user)
  }
}
