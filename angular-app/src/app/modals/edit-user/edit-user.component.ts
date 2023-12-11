import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRegistration } from 'src/app/models/user.model';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() public user: UserRegistration | undefined

  public userForm : FormGroup | any;

  constructor(private userService : UserService,public activeModal:NgbActiveModal,private formBuilder: FormBuilder) {
   }
  

  get form(){
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.userForm = this.createUserForm(new UserRegistration());
    this.userService.getUserProfile().subscribe(
      (profile: any) =>{
        console.log('???????????',profile.payload)
        this.user = profile.payload; 
        this.userForm = this.createUserForm(profile.payload)
      } 
    )
  }

  onSubmit(){
    if(!this.userForm?.valid){
      return;
    }
    const user: UserRegistration = this.userForm?.value;
    this.userService.updateProfile(user).subscribe((response:any)=>{
      console.log(response);
      this.activeModal.close(user);
    })
    console.log(user);
  }

  private createUserForm(user: UserRegistration | undefined): FormGroup{
    return this.formBuilder.group({
      username: [{value:user?.username,disabled: true}],
      name: [user?.name,
        Validators.compose([Validators.required,Validators.minLength(3)])],
      surname: [user?.surname,
        Validators.compose([Validators.required,Validators.minLength(3)])],
      email: [user?.email,
        Validators.compose([Validators.required, Validators.email])],  
      phone: [user?.phone,
        Validators.compose([Validators.required, Validators.pattern(/^\d{10}$/)])],       
    })

  }
}
