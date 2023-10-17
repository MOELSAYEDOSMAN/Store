import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductModel } from 'src/Model/Product/product-model';
import { CartService } from 'src/Service/cart.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.scss']
})
export class FilterProductComponent implements OnChanges{
  stock:number=0;
  Estock:number=0;
  IsloginCk:boolean=localStorage.getItem("token")?true:false;

@Input() Prod:ProductModel|null=null;
constructor(
  private cartSeeting:CartService
) {

}
  ngOnChanges(changes: SimpleChanges): void {
    this.stock=this.Prod?.minimumQuantity??0;
    this.Prod?.productImages.push({
      src:this.Prod.icon
    });
  }

  order()
  {
    if(this.Prod&&this.Estock>=this.Prod?.minimumQuantity)
    {
      this.cartSeeting.addInCart({
        count:this.Estock,
        product:this.Prod
      })
      alert("save")
    }
    else{
      alert("error In Count")
    }
  }
}
