import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OutputProduct } from 'src/Model/Product/output-product';
import { ProductModel } from 'src/Model/Product/product-model';
import { Category } from 'src/Model/category/category';
import { CategoryService } from 'src/Service/Category/category.service';
import { ProductSettingService } from 'src/Service/Product/product-setting.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnDestroy{
lsProduct:OutputProduct={countPage:1,products:[] }as OutputProduct
lsLoveProduct:ProductModel[]=[];
lsobservableDistory:Subscription[]=[];
LodingBage:boolean=true
numberPage:number=0;
numberPageProduct:number[]=[];
lscatogry:Category[]=[];

constructor(private apiProduct:ProductSettingService,private apiCategory:CategoryService) {
  if(localStorage.getItem("LoveProduct"))
  {
    this.lsLoveProduct=JSON.parse(localStorage.getItem("LoveProduct")??"");
  }
  this.lsobservableDistory.push(
    apiCategory.GetAll().subscribe(r=>{
      this.lscatogry=r;
    })
  )
  this.lsobservableDistory.push(
    this.apiProduct.GetAllProduct(0).subscribe(r=>{
      this.lsProduct=r
      this.fillnumberPage(r.countPage);
      this.LodingBage=false
    })
  )
}
  ngOnDestroy(): void {
    this.lsobservableDistory.forEach(x=>x.unsubscribe())
  }

  fillnumberPage(num:number)
  {
    this.numberPageProduct=[];
    for(let i=0;i<num;i++)
    {
      this.numberPageProduct.push(i)
    }
  }
  getProdyctsByType(nameCat:string)
  {
    this.LodingBage=true
    if(nameCat=="-1")
    {
      this.lsobservableDistory.push(
        this.apiProduct.GetAllProduct(0).subscribe(r=>{
          this.lsProduct=r
          this.fillnumberPage(r.countPage);
        this.LodingBage=false

        })
      )
    }else{
    this.lsobservableDistory.push(
      this.apiProduct.GetWithType(nameCat,0).subscribe(
        r=>{
          this.lsProduct=r
          this.fillnumberPage(r.countPage);
        this.LodingBage=false
        }
      )
    )}
  }

  serchProduct(ser:string)
  {
    this.LodingBage=true
    if(ser.length>0)
    {
      this.lsobservableDistory.push(
        this.apiProduct.SerchProduct(ser).subscribe(r=>{
          this.lsProduct.products=[];
          this.lsProduct.products=r;
          this.fillnumberPage(1)
          this.LodingBage=false

        })
      )
    }
    else
    {
      this.lsobservableDistory.push(
        this.apiProduct.GetAllProduct(0).subscribe(r=>{
          this.lsProduct=r
          this.fillnumberPage(r.countPage);
          this.LodingBage=false
        })
      )
    }
  }


  GetProductIndex(index:number)
  {
    this.numberPage=index;
    this.LodingBage=true;
    this.lsobservableDistory.push(this.apiProduct.GetAllProduct(index).subscribe({
      next:r=>{
        this.lsProduct=r;
        this.fillnumberPage(r.countPage);
      this.LodingBage=false;
      }
    }))
  }
prod:ProductModel|null=null;
getproduct(id:string)
{
  this.LodingBage=true
this.lsobservableDistory.push(
  this.apiProduct.GetProduct(id).subscribe(
    {
      next:r=>{this.prod=r;
  this.LodingBage=false}
      ,error:err=>{
  this.LodingBage=false
        alert("Try Agine")
      }
    }
  )
)
}




LoveProductNotifation:string[]=[]
findProductInLove(id:string):boolean
{
 return this.lsLoveProduct.find(x=>x.productId==id)?true:false
}
LoveProduct(id:string)
{
  if(this.findProductInLove(id))
  {
    this.LoveProductNotifation.push("Remove Product in Love")
    for(let i=0;i<this.lsLoveProduct.length;i++)
    {
      if(this.lsLoveProduct[i].productId==id)
      {
        this.lsLoveProduct.splice(i,1);
      }
    }
      localStorage.setItem("LoveProduct",JSON.stringify(this.lsLoveProduct));
  }
  else{
    this.LoveProductNotifation.push("Add Product in Love")
  this.lsobservableDistory.push(this.apiProduct.GetProduct(id).subscribe({
    next:r=>{
      this.lsLoveProduct.push(r);
      localStorage.setItem("LoveProduct",JSON.stringify(this.lsLoveProduct));
    },
    error:e=>{
      alert("error Not Found Product")
    }
  }))}
}
}
