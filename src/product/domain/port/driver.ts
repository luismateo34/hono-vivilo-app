import type { ErrorProduct, Product, createProduct, Category } from "src/product/domain/product";

//---------------------------
export interface createProduc{
  createProduct(productObj: createProduct): Promise<Product | ErrorProduct>;
}
//----------------------
export interface findProducts {
  findby_id(productId: number): Promise<Product | ErrorProduct>;
  findby_name(name: string): Promise<Product | ErrorProduct>;
  findby_category(category: Category, row:number | undefined): Promise<Product[] | ErrorProduct>;
  findby_price_range(initialPrice: number, finalPrice: number, row:number | undefined): Promise<Product[] | ErrorProduct>;
  findby_offert( category: Category | undefined , row:number | undefined): Promise<Product[] | ErrorProduct>;
}
//-------------------------------
export interface updateProduct {
  updateProduct( productId: number  ,productObj: Product): Promise<Product | ErrorProduct>;
  changeQuantity( productId: number ,quantity: number): Promise<Product | ErrorProduct>;
  changePrice( productId: number ,price: number): Promise<Product | ErrorProduct>;
  changeOffert( productId: number ,offert: boolean, offertPercent: number): Promise<Product | ErrorProduct>;
  changeImages( productId: number , imageArr: string[]): Promise<Product | ErrorProduct>;
}

//-------------------------------
export interface deleteProduct {
  deleteProduct( productId: number ): Promise<true | ErrorProduct>;
}
//-------------------------------
export interface facadeProduct extends createProduc,findProducts,updateProduct,deleteProduct{}
