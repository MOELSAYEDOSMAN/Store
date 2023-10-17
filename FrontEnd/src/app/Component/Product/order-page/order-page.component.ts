import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/Model/Order/order';
import { CartService } from 'src/Service/cart.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent  implements OnDestroy{

  lsDestoryOversable:Subscription[]=[];
  order:Order[]=[];
  totalPriceBefore:number=0;
  totalPriceAfter:number=0;
  TotalDiscaount:number=0;
constructor(private cartSettin:CartService) {
this.lsDestoryOversable.push(
  cartSettin.orderList().subscribe(r=>{
    this.order=r;
    for(let i =0;i<r.length;i++)
    {
      this.totalPriceBefore+=r[i].count*r[i].product.price
      this.TotalDiscaount+=(r[i].count*r[i].product.price)*(r[i].product.discount_Rate/100);
    }
    this.totalPriceAfter=this.totalPriceBefore-this.TotalDiscaount;
  })
)
}
  ngOnDestroy(): void {
    this.lsDestoryOversable.forEach(x=>x.unsubscribe());
  }

deleteProduct(index:number)
{
  this.totalPriceAfter=0;
  this.totalPriceBefore=0;
  this.TotalDiscaount=0;
  this.cartSettin.RemoveFromCart(index)
  this.lsDestoryOversable.push(
  this.cartSettin.orderList().subscribe(r=>{
    this.order=r;
    for(let i =0;i<r.length;i++)
    {
      this.totalPriceBefore+=r[i].count*r[i].product.price
      this.TotalDiscaount+=(r[i].count*r[i].product.price)*(r[i].product.discount_Rate/100);
    }
    this.totalPriceAfter=this.totalPriceBefore-this.TotalDiscaount;
  }))
}

orderClick(){
this.cartSettin.clrearOrder();
alert("Order Done");
}
}
