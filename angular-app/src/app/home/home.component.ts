import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { categories } from '../models/categories.model';
import { RecipesService } from '../services/recipes.service';
import { Observable, of } from 'rxjs';
import { Dictionary } from '../models/dictionary.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedIn :Observable<boolean> = of(false);
  public categories :categories[] = [{
    category : 'gluka',
    subcategory: ['kok','negraki'] 
  },
  {
    category : 'almyra',
    subcategory: ['krepes'] 
  },
  {
    category : 'poytsa',
    subcategory: ['']
  }
]
  constructor(public authService:AuthService,private recipesService:RecipesService) { 
    this.loggedIn = this.authService.isLoggenIn
  }
  
  ngOnInit(): void {
      this.authService.isUserLoggedIn();
      
       
    // this.recipesService.getCategories().subscribe(
    //   (cat => {
    //     if(cat){
    //       this.categories = cat;
    //     }
    //   })
    // )
  }

}
