import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  public userForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
    name: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
    surname: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
      email: new UntypedFormControl ('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl ('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
  });

  public errorMessage: string = "" 
  private destroyed$ = new Subject();

  constructor(private router: Router,
    private authService: AuthService) {}

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

 

  ngOnInit() {
    this.userForm = new UntypedFormGroup({
        username: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
        name: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
        surname: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
        email: new UntypedFormControl ('', [Validators.required, Validators.email]),
        phone: new UntypedFormControl ('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.userForm?.valid) {
      this.authService.register(this.userForm.value).pipe(takeUntil(this.destroyed$)).subscribe({
        next : () => {this.router.navigate(['login'])},
        error :(responseError: HttpErrorResponse) => {
          if(responseError.error.error.userMessage){
            this.errorhandle(responseError.error.error.userMessage)
          }  
        }  
    })
      // Process the form data
    
    }
  }

  errorhandle(message:string){
            this.userForm.disable;
            this.errorMessage = message;
  }
}
