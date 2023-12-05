import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the JWT token from the AuthService
    if (request.url.toLowerCase().includes('login') || request.url.toLowerCase().includes('register')) {
      return next.handle(request);
    }
    const token = this.authService.getToken();

    // If a token is present, add it to the Authorization header
   // Create a new request and Add Authorization Headers
   const newRequest = this.addAccessToken(request, token);

   return next.handle(newRequest).pipe(
     catchError(error => {
       // We handle only errors of type HttpErrorResponse with status 401 (Authentication Error)
       if (error instanceof HttpErrorResponse && (error as HttpErrorResponse).status === HttpStatusCode.Unauthorized) {
         return this.handleUnauthorized(request, next);
         }
        else{
          return throwError(() => error)
        }
       } 
     )
   );
  }
    

  // Use this function to clone the request because requests must be immutable
  addAccessToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    return (request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    }));
  }

  handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('>>>>>>>>>>');
    this.authService.logout("expiration");
    return next.handle(req)}

}