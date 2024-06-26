import { Component, ElementRef, OnChanges, OnInit, ChangeDetectorRef, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { categories } from '../models/categories.model';
import { RecipesService } from '../services/recipes.service';
import { Observable, Subject, filter, firstValueFrom, of, takeUntil } from 'rxjs';
import { Dictionary } from '../models/dictionary.model';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { Recipes } from '../models/recipes.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef;
  public searchSuggestions: Recipes[] = [];
  public showSuggestions: boolean =  false;
  public currentRoute = "home"
  public loggedIn :Observable<boolean> = of(false);
  public categories: any[] | undefined;

  private destroyed$ = new Subject();

  constructor(public authService:AuthService,private recipesService:RecipesService,private router:Router) {
    this.loggedIn = this.authService.isLoggenIn
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      // Scroll to the top on route changes
      window.scrollTo(0, 0);
    });
  }
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
      this.authService.isUserLoggedIn();


    this.recipesService.getCategories().pipe(takeUntil(this.destroyed$)).subscribe(
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

  logout(): void {
    this.authService.logout('');
  }

  onSearch(event: any): void {
    // Implement your search logic here using this.searchQuery
    const searchQuery = event.target.searchQuery.value
    this.router.navigate(['/search-results'], { queryParams: { query: searchQuery } });
    this.showSuggestions = false
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }

  onSearchInput(event:any): void {
    const query = event.target.value;
    if(query.length < 3) {
      this.showSuggestions = false;
      return;
    }
    this.recipesService.getSearchSuggestions(query)
      .subscribe(
        (suggestions) => {
      this.showSuggestions = true;
          this.searchSuggestions = suggestions
        },
        (error) => {
          console.error(error);
        }
      );
  }

  OnSuggestionClick(recipeId: string){
    this.router.navigate([`/recipes/${recipeId}`]);
    this.showSuggestions = false
    if (this.searchInput && this.searchInput.nativeElement) {
      this.searchInput.nativeElement.value = '';
    }
  }

  getSuggestionId(recipe: Recipes){
    if (recipe._id) return recipe?._id;
    return '';
  }

  getSuggestionTitle(recipe: Recipes){
    if (recipe.title) return recipe?.title;
    return '';
  }

}
