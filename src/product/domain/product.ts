export enum Category{
  GORRAS="gorras",
  REMERAS="remeras",
  PANTALON="pantalones",
  CAMPERAS="camperas",
  BUZOS="buzos",
  OTROS="otros",
}
//-----------------------
export interface Product{
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imagesUrl:string[];
  categoryproduct: Category;
  offert: boolean;
  offertPercent: number;
}
//-----------------------
export type createProduct = Omit<Product, 'productId'>
//-----------------------
export class ErrorProduct{
  constructor(private message: string){}
  get messageError(){
    return this.message
  }
}
export  interface productPaymet{
   cuantityPay: number,
   product: Product
}
