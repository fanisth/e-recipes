import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserInterceptor } from './interceptors/user.interceptor';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ExpirationModalComponent } from './modals/expiration-modal/expiration-modal.component';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesComponent } from './recipes/recipes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserComponent } from './modals/edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecipePageComponent } from './recipePage/recipePage.component';
import { searchResultsComponent } from './searchResults/searchResults.component';
import { MAT_CHIPS_DEFAULT_OPTIONS, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AllReceipesComponent } from './all-receipes/all-receipes.component';
import { WaitingComponent } from './modals/waiting/waiting.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ExpirationModalComponent,
    RecipesComponent,
    UserProfileComponent,
    EditUserComponent,
    AddRecipeComponent,
    CatalogueComponent,
    CategoriesComponent,
    RecipePageComponent,
    AllReceipesComponent,
    searchResultsComponent,
    WaitingComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbRatingModule,
    HttpClientModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
