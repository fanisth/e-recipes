import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subcategory';
import { RecipesService } from 'src/app/services/recipes.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Router } from '@angular/router';
import {  NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';
import { HttpErrorResponse } from '@angular/common/http';
import { WaitingComponent } from '../modals/waiting/waiting.component';
import {  Subject, takeUntil } from 'rxjs';

class TagArrayItem {
  constructor(public name: string) {}
}



@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit,OnDestroy {

  public modalRef: NgbModalRef | undefined;
  public subcategories: Subcategory[] = [] ;
  
  public fileToUpload: File | null = null;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
 
  
  tagsArray: TagArrayItem[] = [];
  erroMessage = ''


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

  categories: Category[] = [
  ];
  
public recipeForm: FormGroup = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(150)]],
  ingredients: this.fb.array(['', [Validators.required]]),
  instructions: this.fb.array([]),
  equipment: this.fb.array(['', [Validators.required]]),
  description: ['',[Validators.maxLength(500),Validators.required]],
  tags: this.fb.array([]),
  preperation_time: [0, [Validators.required, Validators.min(0)]],
  cooking_time: [0, [Validators.required, Validators.min(0)]],
  difficulty: ['', Validators.required],
  image: new FormControl(null),
  category: ['', Validators.required],
  subcategory: [''],
});

  private destroyed$ = new Subject();
  
  constructor(private fb: FormBuilder, private recipeService:RecipesService,private router:Router, private modalService:NgbModal) { }

  ngOnDestroy(): void {
    this.destroyed$.next(null)
    this.destroyed$.complete()
  }

  ngOnInit(): void {
    // Fetch categories
    this.recipeService.getCategories().pipe(takeUntil(this.destroyed$)).subscribe(
      (cat => {
        if(cat){
          this.categories = cat;
        }
      })
    )

    
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(150)]],
      ingredients: this.fb.array([['', [Validators.required]]]),
      instructions: this.fb.array([]),
      equipment: this.fb.array([['', [Validators.required]]]),
      description: ['',[Validators.maxLength(1000),Validators.required]],
      category: ['', Validators.required],
      subcategory: [''],
      tags: this.fb.array([]),
      preperation_time: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
      cooking_time: [0, [Validators.required, Validators.min(0), Validators.max(150)]],
      difficulty: ['', Validators.required],
      image: new FormControl(null)
    });    
    
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

  createInstruction(): FormGroup {
    return this.fb.group({
      step: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  get instructionForms() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addInstruction() {
    const instruction = this.fb.group({
      key: ['',[Validators.required]],
      value: this.fb.array([['', [Validators.required]]]) // Initialize with an empty string
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

  

  onSubmit() {

    // Handle form submission logic here
    if (!this.fileToUpload) {
      console.error('No file selected.');
      this.erroMessage = 'Η επιλογή εικόνας είναι απαραίτητη'
      return;
    }
    
    if( !this.fileToUpload.type.includes('jpeg') && !this.fileToUpload.type.includes('png') && !this.fileToUpload.type.includes('jpg')){
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
       formData.append('file', this.fileToUpload)

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
      this.recipeService.addReceipe(formData).pipe(takeUntil(this.destroyed$)).subscribe(
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
    this.erroMessage = ''
    if (fileList && fileList.length > 0) {
      
      this.fileToUpload = fileList[0];
      
      if(!this.fileToUpload  ){
        const formData = new FormData();
        formData.append('file', this.fileToUpload );
        this.recipeForm.get('image')?.setValue(formData);
      }
    }
    
    
  }
}

