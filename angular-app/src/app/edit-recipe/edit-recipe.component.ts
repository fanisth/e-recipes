import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipes } from '../models/recipes.model';
import { RecipesService } from '../services/recipes.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from '../interfaces/category';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subcategory } from '../interfaces/subcategory';
import { WaitingComponent } from '../modals/waiting/waiting.component';
import { ActivatedRoute, Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Dictionary } from '../models/dictionary.model';
import { Subject, takeUntil } from 'rxjs';



class TagArrayItem {
  constructor(public name: string) {}
}

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit,OnDestroy {
  private param:string

  @Input() public recipe: Recipes | undefined
  public recipeForm: FormGroup 
  = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    ingredients: this.fb.array(['', [Validators.required]]),
    instructions: this.fb.array([]),
    equipment: this.fb.array(['', [Validators.required]]),
    description: ['',Validators.maxLength(500)],
    tags: this.fb.array([]),
    preperation_time: [0, [Validators.required, Validators.min(0)]],
    cooking_time: [0, [Validators.required, Validators.min(0)]],
    difficulty: ['', Validators.required],
    image: new FormControl(null),
    category: ['', Validators.required],
    subcategory: [''],
  });

  public modalRef: NgbModalRef | undefined;
  public subcategories: Subcategory[] = [] ;
  public startCategory: Category |undefined;
  public startSubCategory: string |undefined;
  erroMessage = ''
  
  public fileToUpload: File | null = null;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  categories: Category[] = [
  ];
 
  
  tagsArray: TagArrayItem[] = [];
  private destroyed$ = new Subject();

  constructor(private fb: FormBuilder, private recipeService:RecipesService, private modalService:NgbModal,private router:Router,private route:ActivatedRoute,) {
    this.param = this.route.snapshot.params['id'];
   }
  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

 
  ngOnInit(): void {

    this.recipeService.getCategories().pipe(takeUntil(this.destroyed$)).subscribe({
      next: (cat => {
        if(cat){
          
          this.categories = cat;
          
        }
      }),
      complete: (()=> this.prefillValues())
  })
    
  }

  prefillValues(){
    this.recipeService.getRecipe(this.param).pipe(takeUntil(this.destroyed$)).subscribe(
      (recipe : any)  => {
        
        if (recipe) {
          recipe = recipe.payload.recipe;
          console.log('recipe',recipe)
          // Patch the form with existing recipe data
          this.recipeForm.patchValue({
            title: recipe.title,
            description: recipe.description
            // ... other properties
          });
  
          // Patch arrays individually
          this.patchArray(this.ingredients, recipe.ingredients);
          this.patchInstruction(this.instructions, recipe.instructions);
          this.patchArray(this.equipment, recipe.equipment);
          this.tagsArray = recipe.tags
          // Handle category and subcategory separately
          if(recipe.categories.length > 1){
            this.startCategory = this.categories.find(cat => cat.id == recipe.categories[0])
            this.recipeForm.get('category')?.setValue(this.startCategory?.id)
            this.findSubcategoryName(recipe)
            if(this.startCategory?.subCategory){
              this.subcategories = this.startCategory?.subCategory 
            }
            this.recipeForm.get('subcategory')?.setValue(this.startSubCategory);
          }
          else{
            this.startCategory = this.categories.find(cat => cat.id == recipe.categories[0])
            this.recipeForm.get('category')?.setValue(this.startCategory);
          }
          
  
          this.recipeForm.patchValue({
            preperation_time: recipe.preperation_time,
            cooking_time: recipe.cooking_time,
            difficulty: recipe.difficulty,
          });
  
          // Additional code for patching other form controls
  
        }
      }
    );
  }

  findSubcategoryName(recipe :any){
    this.categories.forEach(cat => cat.subCategory.find(subcat => {
      if(recipe.categories[1] == subcat._id){
        this.startSubCategory = subcat._id
      }
    }))
  }
  get instructions() {
    return this.recipeForm?.get('instructions') as FormArray;
  }

  get ingredients() : any {
    return this.recipeForm.get('ingredients') as FormArray
  }
 
  get equipment() : any {
    return this.recipeForm.get('equipment') as FormArray
  }

  get tags() : any {
    return this.recipeForm.get('tags') as FormArray
  }

  get title() {
    return this.recipeForm.get('title');
  }

  get preperation_time() {
    return this.recipeForm.get('preperation_time');
  }

  get cooking_time() {
    return this.recipeForm.get('cooking_time');
  }

  get difficulty() {
    return this.recipeForm.get('difficulty');
  }

  get description() {
    return this.recipeForm.get('description');
  }

  get category() {
    return this.recipeForm.get('category');
  }

  get subCategory() {
    return this.recipeForm.get('subcategory');
  }
  

  get instructionForms() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addInstruction() {
    const instruction = this.fb.group({
      key: [''],
      value: this.fb.array(['']) // Initialize with an empty string
    });
    this.instructionForms.push(instruction);
  }

  removeInstruction(index: number) {
    this.instructionForms.removeAt(index);
  }

  getValues(instruction:any) {
    return (instruction.get('value') as FormArray).controls;
  }

  addValue(instruction:any) {
    const values = instruction.get('value') as FormArray;
    values.push(this.fb.control(''));
  }

  removeValue(instruction:any, index: number) {
    const values = instruction.get('value') as FormArray;
    values.removeAt(index);
  }

  addTags() {
    this.tags.push(new FormControl());
  }

  addInsrtuctons() {
    this.instructions.push(new FormControl());
  }

  addIngredients() {
    this.ingredients.push(new FormControl());
  }

  addEquipments() {
    this.equipment.push(new FormControl('', [Validators.required]));
  }
 
  removeIngredients(i:number) {
    this.ingredients.removeAt(i);
  }

  removeEquipments(i:number) {
    this.equipment.removeAt(i);
  }

  removeTags(i:number) {
    this.tags.removeAt(i);
  }

  onCategoryChange() {
    
    const selectedCategoryId = this.recipeForm.get('category')?.value;
    const selectedCategory = this.categories.find((cat) =>  cat.id == selectedCategoryId)

    if (selectedCategory) {
      this.recipeForm.get('subcategory')?.setValue(''); // Clear subcategory when category changes
      if(selectedCategory.subCategory){
        this.subcategories = selectedCategory.subCategory;
      }
      
    }
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tagsArray.push({name: value});
    }
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tagsArray.indexOf(tag);

    if (index >= 0) {
      this.tagsArray.splice(index, 1);
    }
  }
  patchArray(formArray: FormArray, data: any[] | undefined) {
    // Clear the existing array
    while (formArray.length) {
      formArray.removeAt(0);
    }
  
    // Add new values to the array
    data?.forEach((item) => {
      formArray.push(new FormControl(item));
    });
  }

  patchInstruction(formArray: FormArray, data: any[] | undefined){
    while (formArray.length) {
      formArray.removeAt(0);
    }
  
    // Add new values to the array
    data?.forEach((item) => {
      formArray.push(this.createInstructionforSet(item,formArray));
    });
  }
  createInstructionforSet(instructions:Dictionary, formArray:FormArray) {
    var instruction = this.fb.group({
      key: [''],
      value: this.fb.array([''])
       // Initialize with an empty string
    });
    
    const valuesArray = instruction.get('value') as FormArray;
    instruction.patchValue({
      key: instructions.key
    });
    valuesArray.removeAt(0)
    for (let i =0; i < instructions.value.length;i++) {
      valuesArray.push(new FormControl(instructions.value[i]))
    }
    
    return instruction
  }

  onSubmit() {

    
    
    if(this.fileToUpload && !this.fileToUpload.type.includes('jpeg') && !this.fileToUpload.type.includes('png') &&  !this.fileToUpload.type.includes('jpg')){
      this.erroMessage = 'Ο τύπος του αρχείου είναι λανθασμένος'
      return;
    }
    
    if (this.recipeForm.valid) {

      
      // Prepare the data to send to the server
      const formData = new FormData()
     
      
      
      formData.append('title', this.recipeForm.value.title)
      
      this.recipeForm.value.instructions.forEach((item: { key: string | Blob; value: any[]; }, index: any) => {
        formData.append(`instructions[${index}][key]`, item.key);
  
        item.value.forEach((value, valueIndex) => {
          formData.append(`instructions[${index}][value][${valueIndex}]`, value);
        });
      });
      

      this.recipeForm.value.ingredients.forEach((element: string , index: any ) => {
        if(element != null && element.trim().length > 0){
          formData.append(`ingredients[${index}]`,element)
        }
      });
      this.recipeForm.value.equipment.forEach((element: string , index: any ) => {
        if(element != null && element.trim().length > 0){
          formData.append(`equipment[${index}]`,element)
        } 
      });
      formData.append('description', (this.recipeForm.value.description))

      this.recipeForm.value.tags = this.tagsArray.map((tag) => tag.name)
      this.recipeForm.value.tags.forEach((element: string , index: any ) => {
        formData.append(`tags[${index}]`,element)
      });
      // Handle form submission logic here
      if (this.fileToUpload) {
        formData.append('file', this.fileToUpload)
      }
       
      const categoryId = this.recipeForm.value.category;
       
      const subcategoryId = this.recipeForm.value.subcategory
      if(subcategoryId && subcategoryId.trim().length > 0 ){
         this.recipeForm.value.categories = [categoryId, subcategoryId]
      }
      else{
       this.recipeForm.value.categories = [categoryId]
      }

       this.recipeForm.value.categories.forEach((element: string , index: any ) => {
        formData.append(`categories[${index}]`,element)
      });
      formData.append('preperation_time', (this.recipeForm.value.preperation_time))
      formData.append('cooking_time', this.recipeForm.value.cooking_time)
      formData.append('difficulty', this.recipeForm.value.difficulty)


      this.openWaitingModal(formData);
      // Log or send the data to the server as needed
      this.recipeService.ediRecipe(this.recipe?._id,formData).pipe(takeUntil(this.destroyed$)).subscribe(
        {next:() => {
          this.modalRef?.close();
          this.router.navigate(['/profile'])
          
          
        },
        error:(response:HttpErrorResponse)=> {
          console.log(response)
        }
        
      }
      )
    
    }
  }

  openWaitingModal(formdata:FormData ){
    this.modalRef = this.modalService.open(WaitingComponent);
    
    this.modalRef?.result.then(() => {
    
    })
  }
  getSelectedCategory(): Category | undefined {
    const categoryId = this.recipeForm.get('category.categoryId')?.value;
    return this.categories.find(category => category.id === categoryId);
  }

  onFileChange(event: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      this.fileToUpload = fileList[0];
      if(!this.fileToUpload){
        const formData = new FormData();
        formData.append('file', this.fileToUpload );
        this.recipeForm.get('image')?.setValue(formData);
      }
    }
    
    
  }
} 

