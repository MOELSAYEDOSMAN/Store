import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/Model/Order/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  lsorder:Order[]=[]
  private CartControle: BehaviorSubject<number>;
  private CartItems: BehaviorSubject<Order[]>;
  constructor() {
    this.CartControle=new BehaviorSubject<number>(this.lsorder.length);
    this.CartItems=new BehaviorSubject<Order[]>(this.lsorder);
   }


   addInCart(order:Order)
   {
    if(order.count>=order.product.minimumQuantity)
    {
      let pr=this.lsorder.find(o=>o.product.productId==order.product.productId)
      if(pr)
      {
        pr.count=order.count
      }
      else{
        this.lsorder.push(order);
        this.numberInCart(this.lsorder.length)
      }
    }
   }
   GetNumber():Observable<number>
  {
    return this.CartControle.asObservable();
  }
  numberInCart(nu:number)
  {
    this.CartControle.next(nu)
  }
  clrearOrder()
  {
    this.numberInCart(0)
    this.lsorder.splice(0,this.lsorder.length)
  }
   RemoveFromCart(index:number)
   {
    this.lsorder.splice(index,1)
    this.numberInCart(this.lsorder.length)
   }
   orderList():Observable<Order[]>
   {
     return this.CartItems.asObservable()
   }


}
