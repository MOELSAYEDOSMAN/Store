import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoryHomeComponent } from './Category/category-home/category-home.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { ProductHomeComponent } from './Product/product-home/product-home.component';
import { AddProductComponent } from './Product/add-product/add-product.component';
import { EditProductComponent } from './Product/edit-product/edit-product.component';
import { AdminRoleGuard } from 'src/Gards/admin-role.guard';

const routes: Routes =
[
    {path:"",redirectTo:"/Admin/Home",pathMatch:'full'},
    {path:"Home",component:AdminPageComponent,title:"Admin - Home",canActivate:[AdminRoleGuard]},
    //Category
    {path:"Category",component:CategoryHomeComponent,title:"Admin - Category",canActivate:[AdminRoleGuard]},
    {path:"Category/AddCategory",component:AddCategoryComponent,title:"Category - Add",canActivate:[AdminRoleGuard]},
    //Product
    {path:"Product",component:ProductHomeComponent,title:"Admin - Product",canActivate:[AdminRoleGuard]},
    {path:"Product/AddProduct",component:AddProductComponent,title:"Product - Add",canActivate:[AdminRoleGuard]},
    {path:"Product/EditProduct/:Pid",component:EditProductComponent,title:"Product - Edit",canActivate:[AdminRoleGuard]},



]

@NgModule({
  declarations: [
    AdminPageComponent,
    CategoryHomeComponent,
    AddCategoryComponent,
    ProductHomeComponent,
    AddProductComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
