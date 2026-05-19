import { facadeProduct } from "src/product/domain/port/driver";
import { dataqueryProduct } from "src/product/domain/port/driven_product";
import { CreatedriverAdapter } from "./method/create";
import { UpdateProductAdapter } from "./method/update";
import { DeletedriverAdapter } from "./method/delete";
import { FinddriverAdapter } from "./method/find";
import  { ErrorProduct, createProduct, Product, Category } from "src/product/domain/product"

export class AdapterProduct implements facadeProduct {
  private classcreate: CreatedriverAdapter;
  private classupdate: UpdateProductAdapter;
  private classdelete: DeletedriverAdapter;
  private classfind: FinddriverAdapter;
  //---------------------------
  constructor(private readonly driven: dataqueryProduct) {
    this.classcreate = new CreatedriverAdapter(this.driven);
    this.classupdate = new UpdateProductAdapter(this.driven);
    this.classdelete = new DeletedriverAdapter(this.driven);
    this.classfind = new FinddriverAdapter(this.driven);
  }
  //---------------------
  async changeImages(productId: number, imageArr: string[]): Promise<Product | ErrorProduct> {
      return this.classupdate.changeImages(productId, imageArr)
  }
  //---------------------
  async findby_offert(category: Category | undefined, row: number | undefined): Promise<Product[] | ErrorProduct> {
      return this.classfind.findby_offert(category, row)
  }
  //---------------------
  async changeOffert(productId: number, offert: boolean, offertPercent: number): Promise<Product | ErrorProduct> {
      return this.classupdate.changeOffert(productId, offert, offertPercent)
  }
  //---------------------
  async findby_category(category: Category, row?: number): Promise<Product[] | ErrorProduct> {
      return this.classfind.findby_category(category, row)
  }
  //---------------------
  async changePrice(
    productId: number,
    price: number,
  ): Promise<Product | ErrorProduct> {
    return this.classupdate.changePrice(productId, price);
  }
  //-------------------------------
  async changeQuantity(
    productId: number,
    quantity: number,
  ): Promise<Product | ErrorProduct> {
    return this.classupdate.changeQuantity(productId, quantity);
  }
  //-------------------------------
  async updateProduct(
    productId: number,
    productObj: Product,
  ): Promise<Product | ErrorProduct> {
    return this.classupdate.updateProduct(productId, productObj);
  }
  //-------------------------------
  async findby_price_range(
    initialPrice: number,
    finalPrice: number,
    row?: number,
  ): Promise<Product[] | ErrorProduct> {
    return this.classfind.findby_price_range(initialPrice, finalPrice, row);
  }
  //-------------------------------
  async findby_id(productId: number): Promise<Product | ErrorProduct> {
    return this.classfind.findby_id(productId);
  }
  //-------------------------------
  async findby_name(name: string): Promise<Product | ErrorProduct> {
    return this.classfind.findby_name(name);
  }
  //-------------------------------
  async deleteProduct(productId: number): Promise<true | ErrorProduct> {
    return this.classdelete.deleteProduct(productId);
  }
  //-------------------------------
  async createProduct(
    productObj: createProduct,
  ): Promise<Product | ErrorProduct> {
    return this.classcreate.createProduct(productObj);
  }
}
