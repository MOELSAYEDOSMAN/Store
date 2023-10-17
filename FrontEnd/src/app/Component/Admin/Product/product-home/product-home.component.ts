import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { OutputProduct } from 'src/Model/Product/output-product';
import { ProductSettingService } from 'src/Service/Product/product-setting.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnDestroy{
lsProduct:OutputProduct={
  countPage:1,
  products:[]
}
numberPageProduct:number[]=[];
Lodding:boolean=true;
lsDesoryObservable:Subscription[]=[];
constructor(private apiProduct:ProductSettingService) {
this.lsDesoryObservable.push(
apiProduct.GetAllProduct(0).subscribe(r=>{
  this.lsProduct=r;
  for(let i=0;i<r.countPage;i++)
  {
    this.numberPageProduct.push(i);
  }
  this.Lodding=false
})
);
}

Search(ser:string)
{
  this.Lodding=true
  if(ser.length>0)
  {
    this.lsDesoryObservable.push(
      this.apiProduct.SerchProduct(ser).subscribe(r=>{
        this.lsProduct.products=r;
        this.lsProduct.countPage=1
        this.numberPageProduct=[0]
        this.Lodding=false
      })
      );
  }else{
    this.lsDesoryObservable.push(
      this.apiProduct.GetAllProduct(0).subscribe(r=>{
        this.lsProduct=r;
        this.Lodding=false
        this.numberPageProduct=[];
        for(let i=0;i<r.countPage;i++)
            {
              this.numberPageProduct.push(i);
            }
      })
      );
  }
}




deletId:string="";delteindex=-5;
delteSetData(index:number,id:string)
{
  this.deletId=id;
  this.delteindex=index;
}
Delte()
{
  this.lsDesoryObservable.push(
    this.apiProduct.DelteProduct(this.deletId).subscribe(r=>{
      alert(r.message);
      if(r.error==false)
      {
        this.lsProduct.products.splice(this.delteindex,1)
        this.deletId="";
        this.delteindex=-1;
      }
    })
  )
}
numberPage:number=0;
GetProductIndex(index:number)
{
  this.numberPage=index;
  this.Lodding=false;
  this.lsDesoryObservable.push(
    this.apiProduct.GetAllProduct(index).subscribe(r=>{
      this.lsProduct=r;
      this.Lodding=false
      this.numberPageProduct=[];
      for(let i=0;i<r.countPage;i++)
          {
            this.numberPageProduct.push(i);
          }
    })
    );
}
ngOnDestroy(): void {
  this.lsDesoryObservable.forEach(x=>x.unsubscribe())
}
}
