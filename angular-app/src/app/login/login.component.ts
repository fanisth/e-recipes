import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
    });
    
  }

  

  onSubmit() {
    console.log("##########")
    if (this.loginForm?.invalid) {
      return;
    }
    const username = this.loginForm?.get('username')?.value;
    const password = this.loginForm?.get('password')?.value;
    console.log(username, password)
  }

  passwordHide() {
    this.hidePassword = !this.hidePassword;
  }

  


  private handleError() {
    this.errorMessage = "Incorrect username or password. Please try again.";
    this.loginForm?.markAsUntouched();
  }
}
