import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/Model/category/category';
import { InputCategory } from 'src/Model/category/input-category';
import { CategoryService } from 'src/Service/Category/category.service';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss']
})
export class CategoryHomeComponent implements OnDestroy{
LoddingPage:boolean=true;
lsCategory:Category[]=[];
lsObserDestroy:Subscription[]=[];
deltenumber:number=-1;DelteBool:boolean=false;
editNumber=-1;Edircat=-1;
constructor(private apiCategory:CategoryService) {
this.lsObserDestroy.push(
  apiCategory.GetAll().subscribe(r=>{
    this.lsCategory=r;
    this.LoddingPage=false;
  })
)
}

DelteShow(id:number)
{
this.deltenumber=id;
this.DelteBool=true;
}
delteOk()
{
this.lsObserDestroy.push(
  this.apiCategory.DeleteCategory(this.deltenumber).subscribe(r=>{
    this.DelteBool=false;
    let ind=this.lsCategory.findIndex(x=>x.categoryId==this.deltenumber);
    this.lsCategory.splice(ind,1);
  }),
)
}


EditShow(id:number,index:number)
{
this.editNumber=id;
this.Edircat=index
}

editName(val:string)
{
  if(val.length>0)
  {
    let input:InputCategory={
      message:"",save:false,name:val
    }
    this.lsObserDestroy.push(
      this.apiCategory.EditCategory(this.editNumber,input).subscribe(r=>{
        alert(r.message);
        if(r.save==true)
        {
          this.lsCategory[this.Edircat].name=val
        }

      })
    )
  }
  else{
    alert("Must Enter Value")
  }
}


  ngOnDestroy(): void {
    this.lsObserDestroy.forEach(c=>c.unsubscribe());
  }
}
