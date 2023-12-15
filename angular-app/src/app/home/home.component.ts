import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { categories } from '../models/categories.model';
import { RecipesService } from '../services/recipes.service';
import { Observable, firstValueFrom, of } from 'rxjs';
import { Dictionary } from '../models/dictionary.model';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  
  // @ViewChild('firstDropDown')
  // firstDropDown!: NgbDropdown; 

  public currentRoute = "home"
  public loggedIn :Observable<boolean> = of(false);
  public categories: any[] | undefined;

  constructor(public authService:AuthService,private recipesService:RecipesService,private router:Router) { 
    this.loggedIn = this.authService.isLoggenIn
  }
  
  ngOnInit(): void {
      this.authService.isUserLoggedIn();
      
       
    this.recipesService.getCategories().subscribe(
      (cat => {
        if(cat){
          this.categories = cat;
        }
      })
    )
  }

  onHover(drop:NgbDropdown) {
    drop.open();
    }
  
    onHoverout(drop: NgbDropdown) {
      drop.close();
      }
   

      over(drop:NgbDropdown){
        drop.open()
      }
      out(drop:NgbDropdown){
        drop.close()
      }
     
}
