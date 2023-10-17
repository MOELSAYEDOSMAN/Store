import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InputProduct } from 'src/Model/Product/input-product';
import { ProductModel } from 'src/Model/Product/product-model';
import { Category } from 'src/Model/category/category';
import { CategoryService } from 'src/Service/Category/category.service';
import { ProductSettingService } from 'src/Service/Product/product-setting.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnChanges,OnDestroy,OnInit{
  Pid:string|null;
  lsobservableDistory:Subscription[]=[];
  formInput:FormGroup|null=null;
  lsCategory:Category[]=[];
  result:InputProduct={error:false,message:""} as InputProduct;
  Icon!:File;IconSrc:string="";
  Img!:File;ImgSrc:string="";
  input:ProductModel[]=[]
  loggindBol:boolean=true;
  constructor(private fb:FormBuilder,private apiProduct:ProductSettingService
    ,private apiCategory:CategoryService,private router:Router,private activeLink:ActivatedRoute) {
      this.Pid=activeLink.snapshot.paramMap.get("Pid")
      this.formInput=this.fb.group({
        name:[this.input[0]?.name??"",[Validators.required]],
        description:[this.input[0]?.description??"",[Validators.required]],
        price:[this.input[0]?.price.toString()??"",[Validators.required,Validators.pattern("[1-9]{1}[0-9]*\.[0-9]*")]],
        categoryId:[this.input[0]?.categoryId??0,[Validators.required]],
        minimumQuantity:[this.input[0]?.minimumQuantity.toString()??"",[Validators.required]],
        discount_Rate:[this.input[0]?.discount_Rate.toString()??"",[Validators.required]],
      })
      console.log(this.Pid)
      this.lsobservableDistory.push(apiCategory.GetAll().subscribe(r=>{
        this.lsCategory=r;
      }))

  }
  ngOnInit(): void {

    this.lsobservableDistory.push(
      this.apiProduct.GetProductEdit(this.Pid??"").subscribe(
        r=>{
          this.loggindBol=false
          if(r[0]!=null)
          {
            this.input=r
            this.name?.setValue(r[0].name)
            this.description?.setValue(r[0].description)
            this.minimumQuantity?.setValue(r[0].minimumQuantity)
            this.discount_Rate?.setValue(r[0].discount_Rate)
            this.categoryId?.setValue(r[0].categoryId)
            this.price?.setValue(r[0].price)
          }
        }
      )
    )

  }


  //Change Icon
  HandelIcon(event:any)
  {
  let files=(event.target as HTMLInputElement).files;
  if(files)
  {
    let f =files[0]
    if(f.type.startsWith('image/')==true)
    {
      this.Icon=f;
      this.IconSrc=URL.createObjectURL(f);
    }
  }
  }
  ChangeIconProduct()
  {
    if(this.Icon)
    {
      let Input=new FormData();
      Input.append("Img",this.Icon);
       this.lsobservableDistory.push(this.apiProduct.ChangeImg(Input,this.input[1].icon).subscribe());
    }
  }
  ChangeImgProduct(index:number,event:any)
  {
    let files=(event.target as HTMLInputElement).files;
    if(files)
    {
      let f =files[0]
      if(f.type.startsWith('image/')==true)
      {
        this.Img=f;
        let ck=confirm("Are Sure Change Image");
        if(ck)
        {
           this.input[0].productImages[index].src=URL.createObjectURL(f);
          let Input=new FormData();
          Input.append("Img",this.Img);
          this.lsobservableDistory.push(  this.apiProduct.ChangeImg(Input,this.input[1].productImages[index].src).subscribe({
            next:r=>{
              alert("Save")
            },
            error:err=>{
              alert("Error")
            },
          }));
        }
     }
    }
  }
  DelteImgProduct(index:string)
  {
    if(this.input[0].productImages.length>1)
    {
      let ck=confirm("Are You Sure Delte Image")
      if(ck)
      {
         this.lsobservableDistory.push( this.apiProduct.RemoveImg(index).subscribe());
      }
    }
    else{
      alert("No More Image")
    }


  }
  AddImageProduct(event:any)
  {
    let files=(event.target as HTMLInputElement).files;
    if(files)
    {
      let f=files[0]
      if(f.type.startsWith('image/')==true)
      {
        let Input=new FormData();
        Input.append("Imges",f);
        if(confirm("Are You Sure Add Image?"))
        {
          this.lsobservableDistory.push(this.apiProduct.UploadImage(Input,this.input[0].productId).subscribe({
          next:r=>{
            alert("Save")
          }
        }));
       }
      }
    }
    }
    get getTimeStamp()
    {
      return Date.now
    }

ngOnChanges(changes: SimpleChanges): void {




}
sumbit()
{
  if(this.formInput?.invalid)
   {
    alert("Cheack Data")
   }
   else
   {
    let covertdata:InputProduct=this.formInput?.value;
          let inputSent:InputProduct={
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

          this.lsobservableDistory.push( this.apiProduct.EditInformationProduct(inputSent,this.input[0].productId).subscribe(
            {
              next:r=>{
                this.result=r;
                if(r.error==false)
                {
                  this.loggindBol=false;
                  alert("save")
                  this.router.navigate(["Admin/Product"]);
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
//Validator
get name()
{
  return this.formInput?.get("name")
}
get price()
{
  return this.formInput?.get("price")
}
get discount_Rate()
{
  return this.formInput?.get("discount_Rate")
}
get minimumQuantity()
{
  return this.formInput?.get("minimumQuantity")
}
get categoryId()
{
  return this.formInput?.get("categoryId")
}
get description()
{
  return this.formInput?.get("description")
}






ngOnDestroy(): void {
  this.lsobservableDistory.forEach(x=>x.unsubscribe())
}

}
