import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import { JwtUser, UserCookies } from "src/user/infrastructure/userservice";
import {
  ServicePayment,
  ErrorPayment,
} from "src/payment/infrastructure/servicePayment";
import { ArrPaymentProductfilter } from "src/product/application/filter";
import { MercadoPagoOBJ } from "src/payment/infrastructure/mercadopago/mercadopago";
import { webhook } from "src/payment/infrastructure/mercadopago/webhook";
import { CreatePaymentFilter } from "src/payment/application/filter";
import { paymentWebhook } from "src/payment/application/paymentWebhook";

type VariablesUser = {
  jwtPayload: JwtUser;
};

//------------------
/**
 * Primero registro el pago en la base de datos
 * */
export const PaymentRoutes = new Hono<{ Variables: VariablesUser }>().basePath(
  "/paymentCreate",
);
//----user-access
PaymentRoutes.post(
  "registerDB",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  zValidator("json", CreatePaymentFilter),
  async (c) => {
    try {
      const pay = c.req.valid("json");
      const register = await ServicePayment.create(pay);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);
//----------
/**
 *luego se registra el pago en mercado pago
 * usas su ID para el pago en mercado pago
 * */
PaymentRoutes.post(
  "MercadoPagoPay",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  zValidator("json", ArrPaymentProductfilter),
  async (c) => {
    try {
      const { arr, id } = c.req.valid("json");

      const register = await MercadoPagoOBJ.CreatePaymentUrl(arr, id);
      const obj = await ServicePayment.setPending(parseInt(id));
      //-------------
      if (obj instanceof ErrorPayment) {
        return c.json({ message: obj.messageError }, 400);
      }
      //--------------
      if (!register && typeof register === "boolean") {
        return c.json({ message: "error" }, 400);
      }
      //--------------
      return c.json({ url: register }, 200);
    } catch {
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);

/**
 * mercadopago webhook
 */
export const mercadopagowebhook = new Hono().basePath("/webhookMP");
mercadopagowebhook.post(
  "mercadopago",
  zValidator("json", paymentWebhook),
  async (c) => {
    try {
      const id = c.req.param("id");
      const xSignature = c.req.header("x-signature");
      const xRequest = c.req.header("x-request-id");
      if (
        xSignature === undefined ||
        xRequest === undefined ||
        id === undefined
      ) {
        return c.json({ message: "id es undefined" }, 403);
      }
      //--------------------------
      const access = webhook(xSignature, xRequest, id);
      if (!access) {
        return c.json({ message: "forbiden" }, 403);
      }
      //-------------------------
      const { data } = c.req.valid("json");
      const register = await MercadoPagoOBJ.MercadoGetPayment(data.id);
      const obj = await ServicePayment.approve(
        parseInt(register.metadata.text),
      );
      if (obj instanceof ErrorPayment) {
        return c.json({ message: "error" }, 403);
      }
      //-----------------------------
      return c.json({ message: "success" }, 201);
    } catch {
      return c.json({ message: "error" }, 403);
    }
  },
);
//----user-access
//----admin-access

//-----web-hook
