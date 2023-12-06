import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/interfaces/category';
import { Subcategory } from 'src/app/interfaces/subcategory';
import { categories } from 'src/app/models/categories.model';
//import { Subcategory } from 'src/app/interfaces/subcategory';
import { PostRecipes } from 'src/app/models/postRecipes.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  public subcategories: Subcategory[] = [] ;
  
  public fileToUpload: File | null = null;

  category: Category[] = [
    { id: '1', name: 'Category 1', subcategories: [{ id: '11', name: 'Subcategory 1A' }, { id: '12', name: 'Subcategory 1B' }] },
    { id: '2', name: 'Category 2', subcategories: [{ id: '21', name: 'Subcategory 2A' }, { id: '22', name: 'Subcategory 2B' }] },
    { id: '3', name: 'Category 3', subcategories: [{ id: '31', name: 'Subcategory 3A' }, { id: '32', name: 'Subcategory 3B' }] },
  ];
  
public recipeForm: FormGroup = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(50)]],
  ingredients: this.fb.array([]),
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

  
  constructor(private fb: FormBuilder,public activeModal:NgbActiveModal,private recipeService:RecipesService) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ingredients: this.fb.array([]),
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

    
      // this.recipeForm.get('category.categoryId')?.valueChanges.subscribe(categoryId => {
      //   const selectedCategory = this.category.find(category => category.id === categoryId);
      // const subcategoryControl = this.recipeForm.get('subcategory');

      // // Reset and update subcategory options based on the selected category
      // subcategoryControl?.setValue('');
      // subcategoryControl?.setValidators([Validators.required]);
      // subcategoryControl?.patchValue(selectedCategory ? selectedCategory.subcategories[0]?.id : null);
      // subcategoryControl?.updateValueAndValidity();
      // });
    
    
    
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
    const selectedCategoryId = this.recipeForm.get('category')?.value;
    const selectedCategory = this.category.find((cat) =>  cat.id == selectedCategoryId)
    console.log('@@@@@@@@',selectedCategory  )
    console.log('>>>>>>>>',selectedCategoryId  )

    if (selectedCategory) {
      this.recipeForm.get('subcategory')?.setValue(''); // Clear subcategory when category changes
      if(selectedCategory.subcategories){
        this.subcategories = selectedCategory.subcategories;
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

  // addInstruction() {
  //   this.instructions.push(this.createInstruction());
  // }

  // removeInstruction(index: number) {
  //   this.instructions.removeAt(index);
  // }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.recipeForm?.value);
    if (!this.fileToUpload) {
      console.error('No file selected.');
      return;
    }

    if (this.recipeForm.valid) {
      const formData = this.recipeForm.value;
      console.log('!!!!!!!!!!!!!',formData)
      // const formData = new FormData();
      // formData.append('image', this.selectedImage);
      // Extract category and subcategory IDs
      // const categoryId = <string>formData.category;
      // const subcategoryId = <string>formData.subcategory;

      const categoryId  = "656ca9e7cdcf57bb01675a87";
      const subcategoryId = "656caa28cdcf57bb01675a89";
      // Prepare the data to send to the server
      
      const postData:PostRecipes = {
        title: formData.title,
        instructions: formData.instructions,
        ingredients: formData.ingredients,
        equipment: formData.equipment,
        description: formData.description,
        tags: formData.tags,
        photos_url: formData.image,
        categories: [categoryId, subcategoryId],
        preperation_time: formData.preperation_time,
        cooking_time: formData.cooking_time,
        difficulty: formData.difficulty    
      };

      // Log or send the data to the server as needed
      console.log('Form data to be submitted:', postData);
      this.recipeService.addReceipe(postData).subscribe(
        (response:any) => console.log(response)
      )
    }
  }

  getSelectedCategory(): Category | undefined {
    const categoryId = this.recipeForm.get('category.categoryId')?.value;
    return this.category.find(category => category.id === categoryId);
  }

  onFileChange(event: any) {
    const fileList: FileList | null = event.target.files;
    if (fileList && fileList.length > 0) {
      this.fileToUpload = fileList[0];
      //console.log(this.fileToUpload)
      if(!this.fileToUpload){
        const formData = new FormData();
        formData.append('file', this.fileToUpload );
        this.recipeForm.get('image')?.setValue(formData);
        //console.log(formData.getAll('file'))
      }
    }
    
    
  }
}