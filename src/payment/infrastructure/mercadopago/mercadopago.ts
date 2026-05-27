import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { Items } from "mercadopago/dist/clients/commonTypes";
import { productPaymet } from "src/product/domain/product";

class MercadoPagoObject {
  static instance: MercadoPagoObject;
  //---------------------------
  private mpconfig: MercadoPagoConfig;
  //---------------------------
  private constructor() {
    this.mpconfig = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN,
    });
  }
  //------------------------
  static getInstance(): MercadoPagoObject {
    if (!MercadoPagoObject.instance) {
      MercadoPagoObject.instance = new MercadoPagoObject();
    }
    return MercadoPagoObject.instance;
  }
  //-----------------------
  /**
  *  @param id  string - id del pago de mercadopago
  *  @returns Promise PaymentResponse
  *  devuelve un objeto con los datos del pago
  */
  async  MercadoGetPayment(id:string){
      return await new Payment(this.mpconfig).get({ id})
  }
  //----------------
  //----------------
  private uniqueARR(product: productPaymet[]): productPaymet[] {
    const unique = new Set(product.map((el) => JSON.stringify(el)));
    return Array.from(unique).map((el) => JSON.parse(el) as productPaymet);
  }
  //----------------
  private ARRpayment(product: productPaymet[]): Items[] {
    const resp = product.map((el) => {
      const obj: Items = {
        id: el.product.productId.toString(),
        unit_price: el.product.price,
        title: el.product.name,
        quantity: el.cuantityPay,
      };
      return obj;
    });
    return resp;
  }

  //--------------
  /**
  *@param product  productPaymet[] array de productPaymet
  *@param textMetadata  string - metadatos del pago, pasar el id del pago en bas de datos para extraerlo al verificar el pago
  */
  async CreatePaymentUrl(
    product: productPaymet[],
    textMetadata: string,
  ): Promise<string | false> {
    try {
      const unique = this.uniqueARR(product);
      const arrItems = this.ARRpayment(unique);
      const preference = await new Preference(this.mpconfig).create({
        body: {
          items: arrItems,
          metadata: {
            text: textMetadata,
          },
        },
      });
      const url = preference.init_point;
      if (url === undefined) {
        return false;
      }
      return url;
    } catch {
      return false;
    }
  }
}
export const MercadoPagoOBJ = MercadoPagoObject.getInstance()
