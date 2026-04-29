import { updateProduct } from "src/product/domain/port/driver";
import { dataqueryProduct } from "src/product/domain/port/driven_product";
import { ErrorProduct, Product } from "src/product/domain/product";
import {
  numberfilter,
  productFilter,
  offertFilter,
  arrUrl,
  offertPercentfilter
} from "src/product/application/filter";

//----------------------------------------
export class UpdateProductAdapter implements updateProduct {
  constructor(private readonly driver: dataqueryProduct) {}
  //----------------------------------------
  async changeImages(
    productId: number,
    imageArr: string[],
  ): Promise<Product | ErrorProduct> {
    try {
      arrUrl.parse({ imagesUrl: imageArr });
      numberfilter.parse({ number: productId });
      const resp = await this.driver.changeImages(productId, imageArr);
      if (typeof resp === "boolean" && !resp) {
        throw new Error("error al cambiar las imagenes");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(err.message ?? "error al cambiar las imagenes");
    }
  }
  //----------------------------------------
  async changeOffert(
    productId: number,
    offert: boolean,
    offertPercent: number,
  ): Promise<Product | ErrorProduct> {
    try {
      offertFilter.parse({ boolean: offert });
      numberfilter.parse({ number: productId });
      numberfilter.parse({ number: offertPercent });
      offertPercentfilter.parse({ offertPercent: offertPercent })
      const resp = await this.driver.changeOffert(
        productId,
        offert,
        offertPercent,
      );
      if (typeof resp === "boolean" && !resp) {
        throw new Error("error al cambiar el precio");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(err.message ?? "error al cambiar el precio");
    }
  }
  //----------------------------------------
  async changePrice(
    productId: number,
    price: number,
  ): Promise<Product | ErrorProduct> {
    try {
      const filterproduct = numberfilter.safeParse({ number: productId });
      const filterprice = numberfilter.safeParse({ number: price });
      if (!filterprice.success || filterproduct.success) {
        return new ErrorProduct("error, parametros no validos");
      }
      const resp = await this.driver.changePrice(productId, price);
      if (typeof resp === "boolean" && !resp) {
        throw new Error("error al cambiar el precio");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(err.message ?? "error al cambiar el precio");
    }
  }
  //----------------------------------------
  async changeQuantity(
    productId: number,
    quantity: number,
  ): Promise<Product | ErrorProduct> {
    try {
      const filterId = numberfilter.safeParse({ number: productId });
      const filterquantity = numberfilter.safeParse({ number: quantity });
      if (!filterquantity.success || !filterId.success) {
        return new ErrorProduct("error, parametros no validos");
      }
      const resp = await this.driver.changeQuantity(productId, quantity);
      if (typeof resp === "boolean" && !resp) {
        throw new Error("error al cambiar la cantidad");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(err.message ?? "error al cambiar el precio");
    }
  }
  //--------------------------------------
  async updateProduct(
    productId: number,
    productObj: Product,
  ): Promise<Product | ErrorProduct> {
    try {
      const filterId = numberfilter.safeParse({ number: productId });
      const filterproduct = productFilter.safeParse(productFilter);
      if (!filterproduct.success || !filterId.success) {
        throw new Error("error, parametros no validos");
      }
      const resp = await this.driver.updateProduct(productId, productObj);
      if (typeof resp === "boolean" && !resp) {
        throw new Error("error al actualizar el producto");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(err.message ?? "error al cambiar el precio");
    }
  }
}
