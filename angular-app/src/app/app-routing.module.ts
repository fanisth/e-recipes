import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

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
        path: 'profile', component: UserProfileComponent
      },
      {
        path: 'catalogue', component: CatalogueComponent
      },

    ] },
  { path: '**', redirectTo : '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
