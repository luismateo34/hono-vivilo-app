import { PaymentSchema } from "src/payment/infrastructure/paymentSchema";
import { Op, fn, col } from "sequelize";
import { product_sell, SoftdeletePayment } from "src/payment/domain/payment";
import { Productschema } from "src/product/infrastructure/schema";
//------------------------------
//--------------------------------
export const GroupBy = async (
  init: Date,
  final: Date,
): Promise<product_sell[] | null> => {
  try {
    //----------------
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
	  status: SoftdeletePayment.NO_DELETED
        },
      },
    });
    //--------------------
    const arr = resp.map((el) => {
      const objSell = el.products
        .map((el) => {
          const sell: product_sell = {
            id: el.productId,
            name: el.name,
            total_ventas: 1,
          };
          return sell;
        })
        .reduce(
          (acc, el) => {
            const obj: product_sell = {
              ...acc,
              // Mantenemos los datos base del primer elemento que encuentre
              id: acc.id || el.id,
              name: acc.name || el.name,
              // Sumamos las ventas al acumulado anterior
              total_ventas: acc.total_ventas + el.total_ventas,
            };
            return obj;
          },
          { id: 0, name: "", total_ventas: 0 },
        );
      return objSell;
    });

    return arr;
  } catch {
    return null;
  }
};
