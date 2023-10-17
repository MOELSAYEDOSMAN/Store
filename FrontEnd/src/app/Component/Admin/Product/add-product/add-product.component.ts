import { Category } from 'src/Model/category/category';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductSettingService } from 'src/Service/Product/product-setting.service';
import { CategoryService } from 'src/Service/Category/category.service';
import { InputProduct } from 'src/Model/Product/input-product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy{
  lsobservableDistory:Subscription[]=[];
  formInput:FormGroup;
  lsCategory:Category[]=[];
  result:InputProduct={error:false,message:""} as InputProduct;
  IConImg!:File;IconSrc:string="";ErrIcon:boolean=false;
  loggindBol:boolean=false;
  ProductImg:File[]=[];ProductImgSrc:string[]=[];ErrProductImgae:boolean=false;
  constructor(private fb:FormBuilder,private apiProduct:ProductSettingService
    ,private apiCategory:CategoryService,private router:Router) {
      this.formInput=fb.group({
        name:['',[Validators.required]],
        description:['',[Validators.required]],
        price:[,[Validators.required,Validators.pattern("[1-9]{1}[0-9]*\.[0-9]*")]],
        categoryId:['',[Validators.required]],
        minimumQuantity:['',[Validators.required]],
        discount_Rate:['',[Validators.required]],
      })

      this.lsobservableDistory.push(
        apiCategory.GetAll().subscribe(r=>{
          this.lsCategory=r
        })
      )
  }
//Validator
  get name()
  {
    return this.formInput.get("name")
  }
  get price()
  {
    return this.formInput.get("price")
  }
  get discount_Rate()
  {
    return this.formInput.get("discount_Rate")
  }
  get minimumQuantity()
  {
    return this.formInput.get("minimumQuantity")
  }
  get categoryId()
  {
    return this.formInput.get("categoryId")
  }
  get description()
  {
    return this.formInput.get("description")
  }

//UoloadImages:
//Multi
HandelProductFiles(event:any)
{
  let files=(event.target as HTMLInputElement)?.files;
  if(files)
  {
    for(let i=0;i<files?.length;i++)
    {
      let f =files[i]
      if(f as File)
      {
      if(f?.type.startsWith('image/')==true)
        {

          this.ProductImgSrc.push(URL.createObjectURL(f));
          this.ProductImg.push(f);
        }
      }
    }
  }
}
//Singale
HandelFile(event:any)
{
let files=(event.target as HTMLInputElement).files;
if(files)
{
  let f =files[0]
  if(f.type.startsWith('image/')==true)
  {
    this.IConImg=f;
    this.IconSrc = URL.createObjectURL(f);
  }
}
}
//Delete Img
DelteImg(index:number)
{
  this.ProductImg.splice(index,1);
  this.ProductImgSrc.splice(index,1);
}




sumbit()
{
  if(this.formInput.invalid)
  {
    this.result.message="Cheack Data";
    this.result.error=true
  }
  if(this.IConImg){this.ErrIcon=false;}else{this.ErrIcon=true;alert("Must Upload Icom")}
  if(this.ProductImg.length<1){this.ErrProductImgae=true;alert("Must Uplaod Imge Product")}else{this.ErrProductImgae=false}

  if(this.formInput.valid&&this.ErrIcon==false&&this.ErrProductImgae==false)
    {
      this.loggindBol=true
      let covertdata:InputProduct=this.formInput.value;
      let input:InputProduct={
        categoryId:covertdata.categoryId,
        name:covertdata.name,
        price:covertdata.price,
        description:covertdata.description,
        minimumQuantity:covertdata.minimumQuantity,
        discount_Rate:covertdata.discount_Rate,
        message:"",
        error:false,
        save:true
      }

      this.lsobservableDistory.push( this.apiProduct.AddProduct(this.IConImg,this.ProductImg,input).subscribe(
        {
          next:r=>{
            this.result=r;
            if(r.error==false)
            {
              this.loggindBol=false
              this.router.navigate(["/Admin/Product"]);
            }
          },
          error:err=>{
            this.loggindBol=false
            console.log(err);
            alert("Error late Time")
          }
        }
      ))

    }
}

  ngOnDestroy(): void {
    this.lsobservableDistory.forEach(x=>x.unsubscribe())
  }

}
