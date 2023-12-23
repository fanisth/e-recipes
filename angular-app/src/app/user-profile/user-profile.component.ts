import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRegistration } from '../models/user.model';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../modals/edit-user/edit-user.component';
import { UserProfile } from '../models/userProfile.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit,OnDestroy {

  public modalRef: NgbModalRef | undefined;
  public ngbModalOption? : NgbModalOptions; 
  private destroyed$ = new Subject();

  constructor(private userService : UserService, private recipeService:RecipesService, private modalService:NgbModal,private router:Router) { }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  public userRecipes : Recipes[] = []
  public userProfile : UserRegistration = {}; 
  ngOnInit(): void {
    this.userService.getUserProfile().pipe(takeUntil(this.destroyed$)).subscribe(
      (profile: any ) =>{
        this.userProfile = profile.payload; 
      } 
    )

    this.recipeService.getUserRecipes().pipe(takeUntil(this.destroyed$)).subscribe(
      (recipes: any) =>{
        this.userRecipes = recipes.payload.recipes; 
      }
    )
  }

  editProfile(){
    this.ngbModalOption = {
      backdrop: false,
      keyboard: false,
    };
    
    this.openEditProfileModal(this.userProfile,this.ngbModalOption)
    this.modalRef?.result.then((user: UserRegistration) => {
      if(user){
        this.userProfile = user;
      }
    })

  }

  addRecipe(){
    this.router.navigate(['/profile/add-recipe'])

  }


  

  openEditProfileModal(user : UserRegistration | null, options: NgbModalOptions ){
    this.modalRef = this.modalService.open(EditUserComponent, options);
    this.modalRef.componentInstance.user = user;
  }


  openEditRecipeModal(user : UserRegistration | null, options: NgbModalOptions ){
    this.modalRef = this.modalService.open(EditUserComponent, options);
    this.modalRef.componentInstance.user = user;
  }



}
