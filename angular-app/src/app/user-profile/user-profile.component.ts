import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserRegistration } from '../models/user.model';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from '../modals/edit-user/edit-user.component';
import { UserProfile } from '../models/userProfile.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public modalRef: NgbModalRef | undefined;
  public ngbModalOption? : NgbModalOptions; 

  constructor(private userService : UserService, private recipeService:RecipesService, private modalService:NgbModal,private router:Router) { }

  public userRecipes : Recipes[] = []
  public userProfile : UserRegistration = {}; 
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (profile: any ) =>{
        console.log(profile.payload)
        this.userProfile = profile.payload; 
      } 
    )

    this.recipeService.getUserRecipes().subscribe(
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
