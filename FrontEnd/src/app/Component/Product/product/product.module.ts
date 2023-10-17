import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductHomeComponent } from '../product-home/product-home.component';
import { FilterProductComponent } from '../filter-product/filter-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OrderPageComponent } from '../order-page/order-page.component';
import { CkUserLoginGuard } from 'src/Gards/ck-user-login.guard';

const routes: Routes=[
  {path:"",redirectTo:"/Product/Home",pathMatch:'full'},
  {path:"Home",component:ProductHomeComponent,title:"Home - Product"},
  {path:"Order",component:OrderPageComponent,title:"Home - Order",canActivate:[CkUserLoginGuard]},
]
@NgModule({
  declarations: [
    ProductHomeComponent,
    FilterProductComponent,
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
