import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipePageComponent } from './recipePage/recipePage.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { AuthGuard } from './guards/authguard.guard';
import { AllReceipesComponent } from './all-receipes/all-receipes.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children : [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: RecipesComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'profile', component: UserProfileComponent,canActivate:[AuthGuard]
      },
      {
        path: 'catalogue', component: CatalogueComponent
      },
      {
        path: 'categories/:id', component: CategoriesComponent
      },
      {
        path: 'recipes/:id', component: RecipePageComponent
      },
      {
        path: 'profile/add-recipe', component: AddRecipeComponent
      },
      {
        path: 'allReceipes', component: AllReceipesComponent
      },

    ] },
  { path: '**', redirectTo : '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
