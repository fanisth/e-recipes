import { Component, OnInit,  ElementRef, AfterViewInit, Renderer2, ViewEncapsulation  } from '@angular/core';
import { ExtendedDictionary } from '../models/extended-dictionary.model';
import { Recipes } from '../models/recipes.model';
import { Reviews } from '../models/reviews.model';
import { RecipesService } from '../services/recipes.service';
import { ReviewsService } from '../services/reviews.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recipePage',
  templateUrl: './recipePage.component.html',
  styleUrls: ['./recipePage.component.css'],
  encapsulation: ViewEncapsulation.None, 
})
export class RecipePageComponent implements AfterViewInit {

  param: string;

  public recipe: Recipes = {};
  public reviews: Reviews[] = []
  public selectedRating: number = 0;
  public comments: string = '';
  public editPermission: boolean = false;


  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipesService,
    private reviewsService: ReviewsService,
    public authService: AuthService
  ) {
    this.param = this.activatedRoute.snapshot.params['id'];
    console.log('param', this.param);

  }

  extendedInstructions: ExtendedDictionary[] = [];

  calculateAverageRating(recipe: Recipes): number {
    if (!recipe.rating || recipe.rating.counter === 0) {
      return 0;
    }
    return Math.round((recipe.rating.sum / recipe.rating.counter) * 10) / 10;
  }

  getReviewerFullName(review: Reviews): string {
    return `${review?.user?.name} ${review?.user?.lastname}`;
  }

  getRecipePhoto(recipe: Recipes): string {
    if(recipe.photo_url) return recipe.photo_url.imagePath
    return ''
  }

  generateRange(review: Reviews): number[] {
    const length = review.rating ? review.rating : 0;
    return Array.from({ length }, (_, index) => index);
  }

  getRecipeTags(recipe: Recipes): string[] {
    if(recipe.tags) return recipe.tags
    return []
  }

  getRecipeDifficulty(recipe: Recipes): string {
    if(recipe.difficulty === 'hard') return 'Δύσκολη'
    if(recipe.difficulty === 'medium') return 'Απαιτητική'
    return 'Εύκολη'
  }

  ngAfterViewInit() {}

  toggleSector(sector: ExtendedDictionary): void {
    sector.show = !sector.show;
  }

  ngOnInit() {
    this.selectedRating = 0
    console.log('Recipe:', this.recipe);

    this.recipeService.getRecipe(this.param).subscribe((fetchedRecipe: any) => {
      this.recipe = (fetchedRecipe.payload.recipe);
      if (this.recipe.instructions) {
        this.extendedInstructions = this.recipe.instructions.map(instruction => ({ ...instruction, show: true }));
      }
      if (fetchedRecipe.permission === 'edit'){
        this.editPermission = true;
      }
    });

    this.reviewsService.getReviews(this.param).subscribe((fetchedRevs: any) => {
      this.reviews = (fetchedRevs.payload.data);
    });
  }

  submitReview() {
    if (this.selectedRating > 0 && this.comments.trim() !== '') {
      const newReview: Reviews = {
        user: { name: 'User', lastname: 'Anonymous' },
        rating: this.selectedRating,
        text: this.comments,
      };

      this.reviewsService.addReview(newReview, this.param, ).subscribe((response: any) => {
        this.reviews = response.payload.data;

        window.location.reload();
      });
    } else {
      console.error('Please provide both rating and comments.');
    }
  }

  onTagClick(tag: any): void {
    this.router.navigate(['/tags'], { queryParams: { tag } });
  }
}
