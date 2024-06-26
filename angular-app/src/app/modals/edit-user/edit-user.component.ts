import { AfterContentInit, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { UserRegistration } from 'src/app/models/user.model';
import { UserProfile } from 'src/app/models/userProfile.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit,OnDestroy {
  @Input() public user: UserRegistration | undefined

  public userForm : FormGroup | any;

  private destroyed$ = new Subject();

  constructor(private userService : UserService,public activeModal:NgbActiveModal,private formBuilder: FormBuilder) {
   }
   ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }
  

  get form(){
    return this.userForm.controls;
  }
  ngOnInit(): void {
    this.userForm = this.createUserForm(new UserRegistration());
    this.userService.getUserProfile().pipe(takeUntil(this.destroyed$)).subscribe(
      (profile: any) =>{
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
    user.username = this.user?.username;
    this.userService.updateProfile(user).pipe(takeUntil(this.destroyed$)).subscribe((response:any)=>{
      this.activeModal.close(user);
    })
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
