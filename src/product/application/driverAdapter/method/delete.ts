import { deleteProduct } from "src/product/domain/port/driver";
import { dataqueryProduct } from "src/product/domain/port/driven_product";
import { ErrorProduct } from "src/product/domain/product";
import { numberfilter } from "src/product/application/filter";

export class DeletedriverAdapter implements deleteProduct{
  constructor(private readonly driven: dataqueryProduct) {}
  async deleteProduct(productId: number): Promise<true | ErrorProduct> {
      try{
      const { success } = numberfilter.safeParse({ number: productId})
      if ( !success){
	throw new Error("error, id invalido");
      }
      await this.driven.deleteProduct(productId);
      return true
    }catch(e){
     const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }
}
