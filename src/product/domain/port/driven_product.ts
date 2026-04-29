import type {
  Product,
  createProduct,
  Category,
} from "src/product/domain/product";

interface getProduct {
  findby_id(productId: number): Promise<Product | null>;
  findby_name(name: string): Promise<Product | null>;
  findby_category(category: Category, row?: number): Promise<Product[] | null>;
  findby_price_range(
    initialPrice: number,
    finalPrice: number,
    row?: number,
  ): Promise<Product[] | null>;
  findby_offert( category: Category | undefined , row:number | undefined): Promise<Product[] | null>;
}
//--------------------------------------------
interface main {
  createProduct(productObj: createProduct): Promise<Product | false>;
  updateProduct(
    productId: number,
    productObj: Product,
  ): Promise<Product | false>;
  changeImages( productId: number , imageArr: string[]): Promise<Product | false>;
  changeQuantity(productId: number, quantity: number): Promise<Product | false>;
  changePrice(productId: number, price: number): Promise<Product | false>;
  changeOffert( productId: number ,offert: boolean, offertPercent: number): Promise<Product | false>;
  deleteProduct(productId: number): Promise<boolean>;
}
export interface dataqueryProduct extends main, getProduct {}
