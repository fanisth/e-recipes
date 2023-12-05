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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecipesComponent } from './recipes/recipes.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserComponent } from './modals/edit-user/edit-user.component';
import { CommonModule } from '@angular/common';
import { AddRecipeComponent } from './modals/add-recipe/add-recipe.component';

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
    AddRecipeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UserInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
