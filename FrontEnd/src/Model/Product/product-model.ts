import { Category } from "../category/category"

export interface ProductModel {
  productId:string
  name:string
  description:string
  icon:string
  price:number
  minimumQuantity:number
  discount_Rate:number
  categoryId:number
  category:Category
  productImages:ProductImage[]
}

export interface ProductImage
{
  src:string
}
