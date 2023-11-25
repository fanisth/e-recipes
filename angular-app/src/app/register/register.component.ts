import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public userForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
      email: new UntypedFormControl ('', [Validators.required, Validators.email]),
      phone: new UntypedFormControl ('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {}

  ngOnInit() {
    this.userForm = new UntypedFormGroup({
      username: new UntypedFormControl( '', [Validators.required, Validators.minLength(3)]),
        email: new UntypedFormControl ('', [Validators.required, Validators.email]),
        phone: new UntypedFormControl ('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.userForm?.valid) {
      // Process the form data
      console.log(this.userForm.value);
    }
  }
}
