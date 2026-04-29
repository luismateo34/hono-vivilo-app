import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { Op, fn, col } from "sequelize";
import {
  product_sell,
} from "src/payment/domain/payment";
import { Productschema } from "src/product/infrastructure/schema";
//------------------------------
//-----------------------------------
interface ObjProduct extends Productschema {
  totalproduct: number;
}
//--------------------------------
export const GroupBy = async (
  init: Date,
  final: Date,
): Promise<product_sell[] | null> => {
  try {
    const resp = await PaymentSchema.findAll({
      attributes: [],
      //raw: true,
      group: ["Products.productId, Payments.id_payment"], // Agrupamos por el ID del producto
      subQuery: false,
      include: [
        {
          model: Productschema,
          required: true,
          attributes: [
            "productId",
            "name",
            [fn("COUNT", col("products.productId")), "totalproduct"],
          ],
          through: { attributes: [] },
        },
      ],
      where: {
        date: {
          [Op.between]: [init.toString(), final.toString()],
        },
      },
    });
    const arr = resp.map((el) => {
      const { products } = el;
      const productObj = products as ObjProduct;
      const resp = {
        id: productObj.productId,
        name: productObj.name,
	total_ventas: productObj.totalproduct,
      } as product_sell;
      return resp;
    });
    return arr;
  } catch {
    return null;
  }
};
