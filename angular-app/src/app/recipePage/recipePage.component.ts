import { Component, OnInit,  ElementRef, AfterViewInit, Renderer2  } from '@angular/core';
import { ExtendedDictionary } from '../models/extended-dictionary.model';
import { Recipes } from '../models/recipes.model';
import { Reviews } from '../models/reviews.model';
import { RecipesService } from '../services/recipes.service';
import { ReviewsService } from '../services/reviews.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipePage',
  templateUrl: './recipePage.component.html',
  styleUrls: ['./recipePage.component.css']
})
export class RecipePageComponent implements AfterViewInit {

  param: string;

  public recipe: Recipes = {};
  public reviews: Reviews[] = []

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: ActivatedRoute,
    private recipeService: RecipesService,
    private reviewsService: ReviewsService
  ) {
    this.param = this.router.snapshot.params['id'];
    console.log('param', this.param);
  }


  // recipe: Recipes = {
  //     title: 'Χοιρινό με σάλτσα μουστάρδας στη γάστρα',
  //     instructions: [
  //       { key: 'Για το χοιρινό',
  //        value:[ 
  //         'Τυλίγουμε το θυμάρι, το μαϊντανό και το πιπέρι σε ένα κομμάτι τούλι για να χαρίσουμε έξτρα αρώματα στο χοιρινό με σάλτσα μουστάρδας στο φούρνο.',
  //         'Δένουμε το τουλουπάνι.',
  //         'Αφήνουμε το κρέας για μία ώρα στο πάγκο της κουζίνας.',
  //         'Το ταμπονάρουμε με απορροφητικό χαρτί και προσθέτουμε αλάτι και πιπέρι.',
  //         'Βάζουμε 4-5 κουταλιές ελαιόλαδο σε κατσαρόλα που μπαίνει στο φούρνο ή σε γάστρα που μπαίνει στο μάτι της κουζίνας.',
  //         'Ροδίζουμε το κρέας γύρω γύρω καλά να κάνει κρούστα περίπου 10′.',
  //         'Βγάζουμε το κρέας σε πιατέλα, προσθέτουμε τα λαχανικά και τα σοτάρουμε για 2-3′ να γυαλίσουν.',
  //         'Ξαναβάζουμε το κρέας στην κατσαρόλα.',
  //         'Ρίχνουμε 1 φλιτζάνι κρασί και αφήνουμε να εξατμιστεί τελείως.',
  //         'Προσθέτουμε το δεματάκι με τα αρωματικά και τα υπόλοιπα υγρά (κρασί και ζωμό). Πρέπει τα υγρά να καλύπτουν το κρέας μέχρι τη μέση του. (Γι’ αυτό μην χρησιμοποιήσετε τεράστιο σκεύος, αλλιώς προσθέστε λίγο υγρό, νερό ή ζωμό).',
  //         'Φέρνουμε σε σημείο βρασμού.'
  //        ] 
  //       },
  //       { key: 'Για το ψήσιμο', 
  //         value:[ 
  //           'Σκεπάζουμε καλά την κατσαρόλα, ή τη γάστρα, και τη βάζουμε σε προθερμασμένο φούρνο στους 200°C, στις αντιστάσεις, για 15′ και χαμηλώνουμε τον φούρνο στους 160°C.',
  //           'Ψήνουμε για 2 με 2,5 ώρες έως ότου μαλακώσει.',
  //           'Κατά την διάρκεια του ψησίματος γυρίζουμε πλευρές στο κρέας για να ψηθεί σωστά και να μην στεγνώσει.',
  //           'Βγάζουμε το χοιρινό σε πιατέλα.',
  //           'Σουρώνουμε τη σάλτσα.',
  //           'Βράζουμε τη σάλτσα ώσπου να συμπυκνωθεί σε 1 φλιτζάνι περίπου.'
  //         ]
  //       },
  //       { key: 'Για τη σάλτσα με μουστάρδα', 
  //         value:[
  //           'Σε μπολ βάζουμε το βούτυρο (μαλακό) με το αλεύρι και τα αναμιγνύουμε, με τα δάχτυλα.',
  //           'Τα προσθέτουμε στη σάλτσα και ανακατεύουμε συνέχεια μέχρι να βράσει.',
  //           'Χαμηλώνουμε τη φωτιά και σιγοβράζουμε 1 λεπτό.',
  //           'Σβήνουμε τη φωτιά και προσθέτουμε μουστάρδα και προαιρετικά το γιαούρτι.',
  //           'Κόβουμε σε φέτες το κρέας και περιχύνουμε με τη σάλτσα μουστάρδας.',
  //           'Σερβίρουμε με σπυρωτό ρύζι πιλάφι ή πουρέ.'
  //         ]
  //       }
  //     ],
  //     ingredients: [
  //       '1 ½ kg χτένι σπάλας χοιρινό χωρίς κόκκαλο',
  //       'Αλάτι',
  //       'Φρεσκοτριμμένο πιπέρι',
  //       'Λίγο ελαιόλαδο',
  //       '3 κλων. θυμάρι',
  //       '3 κλων. μαϊντανό',
  //       '5-6 κόκκοι μαύρο πιπέρι',
  //       '3 φλ. κρασί',
  //       '2 φλ. ζωμός κότας',
  //       '1 κρεμμύδι',
  //       '1 καρότο',
  //       '1 κομμένο σέλερι',
  //       '1 κομμένο πράσο',
  //       '1 σκελ. σκόρδο',
  //       '1 μήλο',
  //       '1 κ.σ. βούτυρο μαλακωμένο',
  //       '1 κ.σ. αλεύρι',
  //       '1 κ.σ. μουστάρδα με κόκκους',
  //       '2-3 κ.σ. γιαούρτι'
  //     ],
  //     equipment: [
  //       'Απορροφητικό χαρτί',
  //       'Κατσαρόλα',
  //       'Κουτάλι',
  //       'Μπολ',
  //       'Πιατέλα',
  //       'Φούρνος'
  //     ],
  //     tags: ['Tag 1', 'Tag 2'],
  //     photo_url: {
  //       imagePath: '../../assets/recipe1.jpg',
  //       thumbnailPath: '../../assets/recipe1.jpg'
  //     },
  //     preperation_time: 30,
  //     cooking_time: 60,
  //     rating: {
  //       sum: 42,
  //       counter: 10
  //     },
  //     difficulty: 'Intermediate',
  //   };;

  // reviews: Reviews[] = [{
  //   user: { 
  //     name: 'Vasilis',
  //     lastname: 'Iliopoulos'
  //     },
  //   rating: 4,
  //   text: "Τέλεια συνταγή, χεζόμασταν 3 μέρες",
  // },
  // {
  //   user: { 
  //     name: 'Lefteris',
  //     lastname: 'Ziwris'
  //     },
  //   rating: 5,
  //   text: "Το έφτιαξα στο αγόρι μου για την επετειο μας και εμεινε πολυ ευχαριστημενος, και στο τραπεζι και στο κρεβατι ;)",
  // },
  // {
  //   user: { 
  //     name: 'Φάνης',
  //     lastname: 'Θεοδούλου'
  //     },
  //   rating: 2,
  //   text: "Αγόρι του Λευτέρη εδω, το φάι καλό ηταν, στο κρεβάτι μετρια πραγματα, απο χοιρινο σε μπαμιες",
  // }]

  extendedInstructions: ExtendedDictionary[] = [];

  calculateAverageRating(recipe: Recipes): number {
    if (!recipe.rating || recipe.rating.counter === 0) {
      return 0;
    }
    return recipe.rating.sum / recipe.rating.counter;
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

  ngAfterViewInit() {}

  toggleSector(sector: ExtendedDictionary): void {
    sector.show = !sector.show;
  }

  ngOnInit() {
    console.log('Recipe:', this.recipe);

    this.recipeService.getRecipe(this.param).subscribe((fetchedRecipe: any) => {
      this.recipe = (fetchedRecipe.payload.recipe);
      if (this.recipe.instructions) {
        this.extendedInstructions = this.recipe.instructions.map(instruction => ({ ...instruction, show: true }));
      }
    });

    this.reviewsService.getReviews(this.param).subscribe((ferchedRevs: any) => {
      this.reviews = (ferchedRevs.payload.recipe);
      console.log(']]]]]]', ferchedRevs.payload);
    });
  }
}
