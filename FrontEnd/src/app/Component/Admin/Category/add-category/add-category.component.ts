import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/Model/category/category';
import { InputCategory } from 'src/Model/category/input-category';
import { CategoryService } from 'src/Service/Category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy{
  lsObserDestroy:Subscription[]=[];
  CategoryForm:FormGroup;
  input:InputCategory={message:"",name:"",save:true};
  Islooding:boolean=false;
  constructor(private apiCategory:CategoryService,private fb:FormBuilder
    ,private router:Router) {
  this.CategoryForm=fb.group(
    {
      name:new FormControl('',[Validators.required]),
    })
  }

  get name()
  {
    return this.CategoryForm.get("name")
  }


  submit()
  {
    if(this.CategoryForm.valid)
    {
      this.Islooding=true;
      let covertValue:InputCategory=this.CategoryForm.value
      this.input.name=covertValue.name;
      console.log(this.input);
      this.apiCategory.AddCategory(this.input).subscribe(r=>{
        this.input=r
        console.log(r)
        if(r.save==true)
        {
          this.router.navigate(["/Admin/Category"])
        }
        this.Islooding=false
      })
    }
    else{
      this.input.save=false
      this.input.message="Cheack Data"
    }
  }

  ngOnDestroy(): void {
    this.lsObserDestroy.forEach(c=>c.unsubscribe());
  }
}
