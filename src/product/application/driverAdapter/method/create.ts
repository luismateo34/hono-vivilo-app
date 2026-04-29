import { createProduc } from "src/product/domain/port/driver";
import { dataqueryProduct } from "src/product/domain/port/driven_product";
import { Product, ErrorProduct, createProduct } from "src/product/domain/product";
import { productFilter } from "src/product/application/filter";

export class CreatedriverAdapter implements createProduc {
  constructor(private readonly driver: dataqueryProduct) {}
  async createProduct(productObj: createProduct): Promise<Product | ErrorProduct> {
      try{
      const { success }= productFilter.safeParse(productFilter)
      if (!success){
      return new ErrorProduct("error, parametros no validos");
      }
      const { name } = productObj;
      const isExist = await this.driver.findby_name(name);
      if (isExist !== null){
	throw new Error("el producto ya existe, con ese nombre");
      }
      const result = await this.driver.createProduct(productObj);
      if ( typeof result === "boolean" && !result ){
	throw new Error("error al crear el producto");
      }
      return result

    }catch(e){
     const err = e as Error;
      return new ErrorProduct(err.message ?? "error al crear el producto");
    }
  }
}
