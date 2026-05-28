import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { UserCookies } from "src/user/infrastructure/userservice";
import {
  ServicePayment,
  ErrorPayment,
  Status
} from "src/payment/infrastructure/servicePayment";
import {
  jwtAdminPayload,
  adminCookies,
} from "src/admin/infrastructure/Adminservice";

type Variables = {
  Payload: jwtAdminPayload;
};

/**
 * Primero registro el pago en la base de datos
 */
export const PaymentAdminRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/paymentAdmin",
);
PaymentAdminRoutes.get(
  "/findby_User_id/:id",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    try {
      const id_payment = c.req.param("id");
      const id_number = parseInt(id_payment);
      if (isNaN(id_number)) {
        return c.json({ message: "id no eb un numero" }, 200);
      }
      const register = await ServicePayment.findbyId(id_number);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);
PaymentAdminRoutes.get(
  "/findby_all_by_user_&_email/:id",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const name = c.req.query("name");
      const email = c.req.query("email");
      if (name === undefined || email === undefined) {
        return c.json({ message: "id no eb un numero" }, 200);
      }
      const register = await ServicePayment.findAll_by_UserName(name, email);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);
PaymentAdminRoutes.get(
  "/findby_all_by_user_&_email",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const name = c.req.query("name");
      const email = c.req.query("email");
      if (name === undefined || email === undefined) {
        return c.json({ message: "debe ingresar todos los parametros" }, 200);
      }
      const register = await ServicePayment.findAll_by_UserName(name, email);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);
PaymentAdminRoutes.get(
  "/findby_RangeDate_and_UserName",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const name = c.req.query("name");
      const email = c.req.query("email");
      const initdate = c.req.query("initdate");
      const finaldate = c.req.query("finaldate");
      //---------------
      //-------------------
      if (
        name === undefined ||
        email === undefined ||
        initdate === undefined ||
        finaldate === undefined
      ) {
        return c.json({ message: "debe ingresar todos los parametros" }, 200);
      }
           //-------------------
      const dateinit = new Date(initdate);
      const datefinal = new Date(finaldate);
      const register = await ServicePayment.findby_RangeDate_and_UserName(
        name,
        email,
        dateinit,
        datefinal,
      );
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);
PaymentAdminRoutes.get(
  "/findProducts_byId",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const ids = c.req.queries("ids");
      if ( ids === undefined ) {
      return c.json({ message: "id debe ser un numero" }, 400);
      }
      const idNumbers = ids.map((id) => parseInt(id));
      const register = await ServicePayment.findProducts_byId(idNumbers);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch{
      return c.json({ message: "error" }, 400);
    }
  }
);
PaymentAdminRoutes.get(
  "/findbystatus",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const status = c.req.query("status");
      const initdate = c.req.query("initdate");
      const finaldate = c.req.query("finaldate");
      if ( initdate === undefined || finaldate === undefined ){
        return c.json({ message: "fechas incorrectas" }, 400);
      }
      //--------------------
      const dateinit = new Date(initdate);
      const datefinal = new Date(finaldate);
      const register = await ServicePayment.findbyStatus(status as Status, dateinit, datefinal);
      //----------------
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch{
      return c.json({ message: "error" }, 400);
    }
  }
);
PaymentAdminRoutes.get(
  "/findbystatus",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const shipping = c.req.query("shipping");
      if ( shipping !== "true" && shipping !== "false" ){

      return c.json({ message: "shipping debe ser true o false" }, 400);
      }
      const booleanShipping = shipping === "true" ? true : false
      const register = await ServicePayment.findbyShipping(booleanShipping)
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch{
      return c.json({ message: "error" }, 400);
    }
  }
);
PaymentAdminRoutes.get(
  "/Sells_list",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const initdate = c.req.query("initdate");
      const finaldate = c.req.query("finaldate");
      //---------------
      //-------------------
      if (
        initdate === undefined ||
        finaldate === undefined
      ) {
        return c.json({ message: "fechas incorrectas" }, 200);
      }
      const register = await ServicePayment.Product_sells_list(new Date(initdate), new Date(finaldate));
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);

PaymentAdminRoutes.get(
  "/delete",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      //----------
      const ids = c.req.queries("id");
      //-------------------
      if (
        ids === undefined
      ) {
        return c.json({ message: "id deve ser un numero" }, 200);
      }
      const arrayId = ids.map((id) => parseInt(id));
      const register = await ServicePayment.delete(arrayId);
      if (register instanceof ErrorPayment) {
        return c.json({ message: register.messageError }, 400);
      }
      return c.json(register, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);

