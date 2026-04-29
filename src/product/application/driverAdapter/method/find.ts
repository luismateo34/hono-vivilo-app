import { findProducts } from "src/product/domain/port/driver";
import { dataqueryProduct } from "src/product/domain/port/driven_product";
import {
  Product,
  ErrorProduct,
  Category,
} from "src/product/domain/product";
import {
  numberfilter,
  nameFilter,
  categoryFilter,
  rowfilter,
} from "src/product/application/filter";

//--------------------
export class FinddriverAdapter implements findProducts {
  constructor(private readonly driven: dataqueryProduct) {}
  async findby_offert(
    category: Category | undefined,
    row: number | undefined,
  ): Promise<Product[] | ErrorProduct> {
    try {
      categoryFilter.parse({ categoryproduct: category });
      rowfilter.parse({ number: row });
      const resp = await this.driven.findby_offert(category, row);
      if (resp === null) {
        throw new Error("productos no encontrados");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }

  //---------------
  async findby_category(
    category: Category,
    row?: number,
  ): Promise<Product[] | ErrorProduct> {
    try {
      categoryFilter.parse({ categoryproduct: category });
      rowfilter.parse({ number: row });

      const resp = await this.driven.findby_category(category, row);
      if (resp === null) {
        throw new Error("error al encontrar los productos");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }
  //----------------
  async findby_id(productId: number): Promise<Product | ErrorProduct> {
    try {
      const { success } = numberfilter.safeParse({ number: productId });
      if (!success) {
        throw new Error("error, id invalido");
      }
      const resp = await this.driven.findby_id(productId);
      if (resp === null) {
        throw new Error("error al encontrar los productos");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }
  //----------------
  async findby_name(name: string): Promise<Product | ErrorProduct> {
    try {
      const { success } = nameFilter.safeParse({ name });
      if (!success) {
        throw new Error("nombre invalido");
      }
      const resp = await this.driven.findby_name(name);
      if (resp === null) {
        throw new Error("error al encontrar los productos");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }
  //----------------
  async findby_price_range(
    initialPrice: number,
    finalPrice: number,
    row?: number,
  ): Promise<Product[] | ErrorProduct> {
    try {
      const start = numberfilter.safeParse({ number: initialPrice });
      const final = numberfilter.safeParse({ number: finalPrice });
      rowfilter.parse({ number: row })
      if (!start.success || !final.success) {
        throw new Error("tipo de parametros invalido");
      }
      const resp = await this.driven.findby_price_range(
        initialPrice,
        finalPrice,
        row,
      );
      if (resp === null) {
        throw new Error("error al encontrar los productos");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      return new ErrorProduct(
        err.message ?? "error al encontrar los productos",
      );
    }
  }
}
