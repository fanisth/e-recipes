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
import { searchResultsComponent } from './searchResults/searchResults.component';
import { TagPageComponent } from './tagPage/tagPage.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

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
        path: 'catalogue', component: CatalogueComponent
      },
      {
        path: 'categories/:id', component: CategoriesComponent
      },
      {
        path: 'recipes/:id', component: RecipePageComponent
      },
      {
        path: 'profile', component: UserProfileComponent,canActivate:[AuthGuard]
      },
      {
        path: 'profile/add-recipe', component: AddRecipeComponent,canActivate:[AuthGuard]
      },
      {
        path: 'profile/edit-recipe/:id', component: EditRecipeComponent,canActivate:[AuthGuard]
      },
      {
        path: 'allReceipes', component: AllReceipesComponent
      },
      {
        path: 'search-results', component: searchResultsComponent
      },
      {
        path: 'tags', component: TagPageComponent
      }

    ] },
  { path: '**', redirectTo : '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
