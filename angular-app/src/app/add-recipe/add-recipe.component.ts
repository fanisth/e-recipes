import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subcategory';
import { categories } from 'src/app/models/categories.model';
import { PostRecipes } from 'src/app/models/postRecipes.model';
import { RecipesService } from 'src/app/services/recipes.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

class TagArrayItem {
  constructor(public name: string) {}
}

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public subcategories: Subcategory[] = [] ;
  
  public fileToUpload: File | null = null;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  
  tagsArray: TagArrayItem[] = [];

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
    { id: '1', name: 'Category 1', subCategory: [{ id: '11', name: 'Subcategory 1A' }, { id: '12', name: 'Subcategory 1B' }] },
    { id: '2', name: 'Category 2', subCategory: [{ id: '21', name: 'Subcategory 2A' }, { id: '22', name: 'Subcategory 2B' }] },
    { id: '3', name: 'Category 3', subCategory: [{ id: '31', name: 'Subcategory 3A' }, { id: '32', name: 'Subcategory 3B' }] },
  ];
  
public recipeForm: FormGroup = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(50)]],
  ingredients: this.fb.array(['', [Validators.required]]),
  instructions: this.fb.array([]),
  equipment: this.fb.array(['', [Validators.required]]),
  description: ['',Validators.maxLength(150)],
  tags: this.fb.array([]),
  preperation_time: [0, [Validators.required, Validators.min(0)]],
  cooking_time: [0, [Validators.required, Validators.min(0)]],
  difficulty: ['', Validators.required],
  image: new FormControl(null),
  category: ['', Validators.required],
  subcategory: ['', Validators.required],
});

  
  constructor(private fb: FormBuilder, private recipeService:RecipesService) { }

  ngOnInit(): void {
    // Fetch categories
    this.recipeService.getCategories().subscribe(
      (cat => {
        if(cat){
          this.categories = cat;
        }
      })
    )
    
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ingredients: this.fb.array([['', [Validators.required]]]),
      instructions: this.fb.array([]),
      equipment: this.fb.array([['', [Validators.required]]]),
      description: ['',Validators.maxLength(150)],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      tags: this.fb.array([]),
      preperation_time: [0, [Validators.required, Validators.min(0)]],
      cooking_time: [0, [Validators.required, Validators.min(0)]],
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
    console.log('BEFORE:',this.recipeForm.value, this.recipeForm.value.category, this.recipeForm.value.subcategory)
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

  

  onSubmit() {
    // Handle form submission logic here
    if (!this.fileToUpload) {
      console.error('No file selected.');
      return;
    }

    if (this.recipeForm.valid) {

      console.log(this.recipeForm.value);
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
        formData.append(`ingredients[${index}]`,element)
      });
      this.recipeForm.value.equipment.forEach((element: string , index: any ) => {
        formData.append(`equipment[${index}]`,element)
      });
      formData.append('description', (this.recipeForm.value.description))

      this.recipeForm.value.tags = this.tagsArray.map((tag) => tag.name)
      this.recipeForm.value.tags.forEach((element: string , index: any ) => {
        formData.append(`tags[${index}]`,element)
      });
       formData.append('file', this.fileToUpload)

       const categoryId = this.recipeForm.value.category;
       const subcategoryId = this.recipeForm.value.subcategory
       this.recipeForm.value.categories = [categoryId, subcategoryId]
       this.recipeForm.value.categories.forEach((element: string , index: any ) => {
        formData.append(`categories[${index}]`,element)
      });
      formData.append('preperation_time', (this.recipeForm.value.preperation_time))
      formData.append('cooking_time', this.recipeForm.value.cooking_time)
      formData.append('difficulty', this.recipeForm.value.difficulty)



      // Log or send the data to the server as needed
       console.log('Form data to be submitted:', formData.forEach(key => console.log(key)));
      this.recipeService.addReceipe(formData).subscribe(
        (response:any) => console.log(response)
      )
    }
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