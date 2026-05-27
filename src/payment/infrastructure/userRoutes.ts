import { Hono } from "hono";
import { jwt } from "hono/jwt";
import { JwtUser, UserCookies } from "src/user/infrastructure/userservice";
import {
  ServicePayment,
  ErrorPayment,
} from "src/payment/infrastructure/servicePayment";

type VariablesUser = {
  jwtPayload: JwtUser;
};

export const PaymentUserRoutes = new Hono<{
  Variables: VariablesUser;
}>().basePath("/PaymentUser");
//------------
PaymentUserRoutes.get(
  "/findby_User_id/:id",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
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
PaymentUserRoutes.get(
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
PaymentUserRoutes.get(
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
PaymentUserRoutes.get(
  "/findby_RangeDate_and_UserName",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const payload = c.get("jwtPayload");
      //----------
      const name = c.req.query("name");
      const email = c.req.query("email");
      const initdate = c.req.query("initdate");
      const finaldate = c.req.query("finaldate");
      //---------------
      const id_user = c.req.query("idUser");
      //-------------------
      if (
        name === undefined ||
        email === undefined ||
        initdate === undefined ||
        finaldate === undefined||
        id_user === undefined
      ) {
        return c.json({ message: "id no eb un numero" }, 200);
      }
      //---------------
      if (name !== payload.name) {
        return c.json({ message: "id no eb un numero" }, 200);
      }
      //----------------
      if ( parseInt(id_user) !== payload.userId ){
        return c.json({ message: "id no eb un numero" }, 200);
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
      return c.json({ message: "registro fallido" }, 400);
    }
  },
);
