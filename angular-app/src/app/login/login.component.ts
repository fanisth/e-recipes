import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hidePassword: boolean = false;
  public loginForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });
  public errorMessage: string = '';
  public mediaDetected = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
    
  }

  

  onSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    const username = this.loginForm?.get('username')?.value;
    const password = this.loginForm?.get('password')?.value;
    this.authService.login({username,password}).subscribe({
      next: (response =>{
        console.log("######", response)
        this.router.navigate(['']);
      }),
      error: (error =>{
        
        if(error.error.error.userMessage){
          console.log("@@@@@@@@@",error.error.error.userMessage)
          this.errorMessage = error.error.error.userMessage;
        }
        this.handleError(error.error.error.userMessage)
      }),
    });
    console.log(username, password)
  }

  passwordHide() {
    this.hidePassword = !this.hidePassword;
  }

  


  private handleError(message:string) {
    this.errorMessage = message;
    //this.loginForm?.markAsUntouched();
    this.loginForm?.reset()
  }
}
