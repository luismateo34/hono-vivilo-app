import { dataqueryProduct } from "src/product/domain/port/driven_product";
import {
  createProduct,
  Product,
  Category,
  SoftDelete,
} from "src/product/domain/product";
import { Op } from "sequelize";
import pino from "pino";
import { Productschema } from "src/product/infrastructure/schema";
//-------------------------------------

export class ProductDatabase implements dataqueryProduct {
  async changePrice(
    productId: number,
    price: number,
  ): Promise<Product | false> {
    try {
      const resp = await Productschema.update(
        { price: price },
        { where: { productId: productId, SoftDelete: SoftDelete.NO_DELETED }, returning: true },
      );
      if (resp[1].length === 0) {
        return false;
      }
      const eschemaUpdate = resp[1][0];
      const productObj: Product = {
        categoryproduct: eschemaUpdate.categoryproduct,
        description: eschemaUpdate.description,
        imagesUrl: eschemaUpdate.imagesUrl,
        name: eschemaUpdate.name,
        offert: eschemaUpdate.offert,
        offertPercent: eschemaUpdate.offertPercent,
        price: eschemaUpdate.price,
        productId: eschemaUpdate.productId,
        quantity: eschemaUpdate.quantity,
        SoftDelete: eschemaUpdate.SoftDelete,
      };
      return productObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "changePrice" });
      logs.info(err.message ?? "error al cambiar el precio");
      return false;
    }
  }
  //----------------------------------
  async changeQuantity(
    productId: number,
    quantity: number,
  ): Promise<Product | false> {
    try {
      const resp = await Productschema.update(
        { quantity: quantity },
        { where: { productId: productId, SoftDelete: SoftDelete.NO_DELETED }, returning: true },
      );
      if (resp[1].length === 0) {
        return false;
      }
      const eschemaUpdate = resp[1][0];
      const productObj: Product = {
        categoryproduct: eschemaUpdate.categoryproduct,
        description: eschemaUpdate.description,
        imagesUrl: eschemaUpdate.imagesUrl,
        name: eschemaUpdate.name,
        offert: eschemaUpdate.offert,
        offertPercent: eschemaUpdate.offertPercent,
        price: eschemaUpdate.price,
        productId: eschemaUpdate.productId,
        quantity: eschemaUpdate.quantity,
        SoftDelete: eschemaUpdate.SoftDelete,
      };
      return productObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "changeQuantity" });
      logs.info(err.message ?? "error al cambiar el stock");
      return false;
    }
  }
  //---------------------------------
  async changeImages(
    productId: number,
    imageArr: string[],
  ): Promise<Product | false> {
    try {
      const resp = await Productschema.update(
        { imagesUrl: imageArr },
        { where: { productId: productId, SoftDelete: SoftDelete.NO_DELETED }, returning: true },
      );
      if (resp[1].length === 0) {
        return false;
      }
      const eschemaUpdate = resp[1][0];
      const productObj: Product = {
        categoryproduct: eschemaUpdate.categoryproduct,
        description: eschemaUpdate.description,
        imagesUrl: eschemaUpdate.imagesUrl,
        name: eschemaUpdate.name,
        offert: eschemaUpdate.offert,
        offertPercent: eschemaUpdate.offertPercent,
        price: eschemaUpdate.price,
        productId: eschemaUpdate.productId,
        quantity: eschemaUpdate.quantity,
        SoftDelete: eschemaUpdate.SoftDelete,
      };
      return productObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "changeQuantity" });
      logs.info(err.message ?? "error al cambiar imagenes");
      return false;
    }
  }
  //---------------------------------
  async changeOffert(
    productId: number,
    offert: boolean,
    offertPercent: number,
  ): Promise<Product | false> {
    try {
      const resp = await Productschema.update(
        { offert: offert, offertPercent: offertPercent },
        { where: { productId: productId, SoftDelete: SoftDelete.NO_DELETED }, returning: true },
      );
      if (resp[1].length === 0) {
        return false;
      }
      const eschemaUpdate = resp[1][0];
      const productObj: Product = {
        categoryproduct: eschemaUpdate.categoryproduct,
        description: eschemaUpdate.description,
        imagesUrl: eschemaUpdate.imagesUrl,
        name: eschemaUpdate.name,
        offert: eschemaUpdate.offert,
        offertPercent: eschemaUpdate.offertPercent,
        price: eschemaUpdate.price,
        productId: eschemaUpdate.productId,
        quantity: eschemaUpdate.quantity,
        SoftDelete: eschemaUpdate.SoftDelete,
      };
      return productObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "changeOffert" });
      logs.info(err.message ?? "error al cambiar el estado de oferta");
      return false;
    }
  }
  //---------------------------------
  async createProduct(productObj: createProduct): Promise<Product | false> {
    try {
      const create: createProduct = {
        ...productObj,
        SoftDelete: SoftDelete.NO_DELETED,
      };
      const resp = await Productschema.create(create, { returning: true });
      if (resp === null) {
        return false;
      }

      const ProductObj: Product = {
        categoryproduct: resp.categoryproduct,
        description: resp.description,
        imagesUrl: resp.imagesUrl,
        name: resp.name,
        offert: resp.offert,
        offertPercent: resp.offertPercent,
        price: resp.price,
        productId: resp.productId,
        quantity: resp.quantity,
        SoftDelete: resp.SoftDelete,
      };
      return ProductObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "createProduct" });
      logs.info(err.message ?? "error al crear producto");
      return false;
    }
  }
  //------------------------------------------
  async deleteProduct(productId: number): Promise<boolean> {
    try {
      const resp = await Productschema.update(
        { SoftDelete: SoftDelete.DELETED },
        { where: { productId: productId }, returning: true },
      );
      if (resp[1].length === 0) {
        return false;
      }

      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "deleteProduct" });
      logs.info(err.message ?? "error al borrar producto");
      return false;
    }
  }
  //-------------------------------------
  async findby_category(
    category: Category,
    row?: number,
  ): Promise<Product[] | null> {
    try {
      const resp =
        row === undefined
          ? await Productschema.findAll({
              where: {
                categoryproduct: category,
                SoftDelete: SoftDelete.NO_DELETED,
              },
            })
          : await Productschema.findAll({
              where: {
                categoryproduct: category,
                SoftDelete: SoftDelete.NO_DELETED,
              },
              offset: (row - 1) * 10,
              limit: row * 10,
            });
      if (resp.length === 0) {
        return null;
      }
      const arrObj = resp.map((el) => {
        const {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        } = el;
        const obj: Product = {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        };
        return obj;
      });
      return arrObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-findby_category" });
      logs.info(err.message ?? "error al buscar por categoria");
      return null;
    }
  }
  //-------------------------------
  async findby_id(productId: number): Promise<Product | null> {
    try {
      const resp = await Productschema.findOne({
        where: { productId: productId, SoftDelete: SoftDelete.NO_DELETED},
      });
      if (resp === null) {
        return null;
      }
      const ProductObj: Product = {
        categoryproduct: resp.categoryproduct,
        description: resp.description,
        imagesUrl: resp.imagesUrl,
        name: resp.name,
        offert: resp.offert,
        offertPercent: resp.offertPercent,
        price: resp.price,
        productId: resp.productId,
        quantity: resp.quantity,
        SoftDelete: resp.SoftDelete,
      };
      return ProductObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-findby_Id" });
      logs.info(err.message ?? "error al buscar por id");
      return null;
    }
  }
  //--------------------------------
  async findby_name(name: string): Promise<Product | null> {
    try {
      const resp = await Productschema.findOne({
        where: { name: name, SoftDelete: SoftDelete.NO_DELETED },
      });
      if (resp === null) {
        return null;
      }
      const ProductObj: Product = {
        categoryproduct: resp.categoryproduct,
        description: resp.description,
        imagesUrl: resp.imagesUrl,
        name: resp.name,
        offert: resp.offert,
        offertPercent: resp.offertPercent,
        price: resp.price,
        productId: resp.productId,
        quantity: resp.quantity,
        SoftDelete: resp.SoftDelete,
      };
      return ProductObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-findby_Name" });
      logs.info(err.message ?? "error al buscar por nombre");
      return null;
    }
  }
  //--------------------------------
  async findby_deleted(): Promise<Product[] | false> {
    try {
      const resp = await Productschema.findAll({
        where: { SoftDelete: SoftDelete.DELETED },
      });
      if (resp === null) {
        return false;
      }
      const objresp = resp.map((el) => {
        const obj: Product = {
          categoryproduct: el.categoryproduct,
          description: el.description,
          imagesUrl: el.imagesUrl,
          name: el.name,
          offert: el.offert,
          offertPercent: el.offertPercent,
          price: el.price,
          productId: el.productId,
          quantity: el.quantity,
          SoftDelete: el.SoftDelete,
        };
        return obj;
      });
      return objresp;
    } catch {
      return false;
    }
  }
  //--------------------------------
  async findby_offert(
    category: Category | undefined,
    row: number | undefined,
  ): Promise<Product[] | null> {
    try {
      let resp: Productschema[];
      if (category === undefined) {
        const schema = await Productschema.findAll({
          where: { offert: true, SoftDelete: SoftDelete.NO_DELETED },
        });
        resp = schema;
      } else if (row === undefined) {
        const schema = await Productschema.findAll({
          where: {
            categoryproduct: category,
            offert: true,
            SoftDelete: SoftDelete.NO_DELETED,
          },
        });
        resp = schema;
      } else {
        const schema = await Productschema.findAll({
          where: { categoryproduct: category, offert: true },
          offset: (row - 1) * 10,
          limit: row * 10,
        });
        resp = schema;
      }
      //-------------------------
      if (resp.length === 0) {
        return null;
      }
      const arrObj = resp.map((el) => {
        const {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        } = el;
        const obj: Product = {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        };
        return obj;
      });
      return arrObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-findby_offert" });
      logs.info(err.message ?? "error al buscar por oferta");
      return null;
    }
  }
  //--------------------------------
  async findby_price_range(
    initialPrice: number,
    finalPrice: number,
    row?: number,
  ): Promise<Product[] | null> {
    try {
      const resp =
        row === undefined
          ? await Productschema.findAll({
              where: {
                categoryproduct: Category,
                softDelete: SoftDelete.NO_DELETED,
                price: { [Op.between]: [initialPrice, finalPrice] },
              },
            })
          : await Productschema.findAll({
              where: {
                categoryproduct: Category,
                softDelete: SoftDelete.NO_DELETED,
                price: { [Op.between]: [initialPrice, finalPrice] },
              },
              offset: (row - 1) * 10,
              limit: row * 10,
            });
      if (resp.length === 0) {
        return null;
      }
      const arrObj = resp.map((el) => {
        const {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        } = el;
        const obj: Product = {
          categoryproduct,
          description,
          imagesUrl,
          name,
          offert,
          offertPercent,
          price,
          productId,
          quantity,
          SoftDelete,
        };
        return obj;
      });
      return arrObj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-findby_rangerPrice" });
      logs.info(err.message ?? "error al buscar por rango de precios");
      return null;
    }
  }
  //--------------------------------
  async updateProduct(
    productId: number,
    productObj: Product,
  ): Promise<Product | false> {
    try {
      const resp = await Productschema.update(productObj, {
        where: { productId: productId, softDelete: SoftDelete.NO_DELETED },
        returning: true,
      });
      if (resp[1].length === 0) {
        throw new Error("error al actualizar el producto");
      }
      const schemaUpdate = resp[1][0];
      const ProductObject: Product = {
        categoryproduct: schemaUpdate.categoryproduct,
        description: schemaUpdate.description,
        imagesUrl: schemaUpdate.imagesUrl,
        name: schemaUpdate.name,
        offert: schemaUpdate.offert,
        offertPercent: schemaUpdate.offertPercent,
        price: schemaUpdate.price,
        productId: schemaUpdate.productId,
        quantity: schemaUpdate.quantity,
        SoftDelete: schemaUpdate.SoftDelete,
      };
      return ProductObject;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "product-update" });
      logs.info(err.message ?? "error al actualizar el producto");
      return false;
    }
  }
}
