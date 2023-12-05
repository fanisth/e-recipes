import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {


  public fileToUpload: File | null = null;

  

public recipeForm: FormGroup = this.fb.group({
  title: ['', [Validators.required, Validators.maxLength(50)]],
  ingredients: this.fb.array([]),
  equipments: this.fb.array(['', [Validators.required]]),
  tags: this.fb.array([]),
  preperation_time: [0, [Validators.required, Validators.min(0)]],
  cooking_time: [0, [Validators.required, Validators.min(0)]],
  difficulty: ['', Validators.required],
  image: new FormControl(null)
});
  
  constructor(private fb: FormBuilder,public activeModal:NgbActiveModal,private host: ElementRef<HTMLInputElement>) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      ingredients: this.fb.array([]),
      equipments: this.fb.array([['', [Validators.required]]]),
      tags: this.fb.array([]),
      preperation_time: [0, [Validators.required, Validators.min(0)]],
      cooking_time: [0, [Validators.required, Validators.min(0)]],
      difficulty: ['', Validators.required],
      image: new FormControl(null)
    });
  }

  get instructionForms() {
    return this.recipeForm?.get('instructions') as FormArray;
  }

  get ingredients() : any {
    return this.recipeForm.get('ingredients') as FormArray
  }
 
  get equipments() : any {
    return this.recipeForm.get('equipments') as FormArray
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
 
  addTags() {
    this.tags.push(new FormControl());
  }

  addIngredients() {
    this.ingredients.push(new FormControl());
  }

  addEquipments() {
    this.equipments.push(new FormControl('', [Validators.required]));
  }
 
  removeIngredients(i:number) {
    this.ingredients.removeAt(i);
  }

  removeEquipments(i:number) {
    this.equipments.removeAt(i);
  }

  removeTags(i:number) {
    this.tags.removeAt(i);
  }

  createInstruction(): FormGroup {
    return this.fb.group({
      step: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  addInstruction() {
    this.instructionForms.push(this.createInstruction());
  }

  removeInstruction(index: number) {
    this.instructionForms.removeAt(index);
  }

  onSubmit() {
    // Handle form submission logic here
    console.log(this.recipeForm?.value);
    if (!this.fileToUpload) {
      console.error('No file selected.');
      return;
    }
    
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