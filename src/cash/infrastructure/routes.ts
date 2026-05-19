import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  cashFilter,
  updateCash,
  updateExpense,
  updateRevenue,
} from "src/cash/application/filter";
import {
  adminCookies,
  jwtAdminPayload,
} from "src/admin/infrastructure/Adminservice";
import {
  AmountService,
  Currency,
  ErrorCash,
} from "src/cash/infrastructure/cashService";

type Variables = {
  jwtPayload: jwtAdminPayload;
};
//------------------
export const CashRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/cash",
);
//--------------
CashRoutes.get(
  "/by_date",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    const date_str = c.req.param("date") as string;
    const currencyParam = c.req.param("currency") as Currency;
    //-------------
    if (date_str === undefined) {
      return c.json(
        { message: " no se pudo encontrar el cash, ingrese una fecha" },
        400,
      );
    }
    //--------------
    const datecash = new Date(date_str);
    const getamount = await AmountService.find_byDate(datecash, currencyParam);
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ getamount }, 200);
  },
);
//-----------------
CashRoutes.get(
  "/by_date_range",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    const initdate_str = c.req.param("date") as string;
    const finaldate_str = c.req.param("date") as string;
    const currencyParam = c.req.param("currency") as Currency;
    //-------------
    if (initdate_str === undefined || finaldate_str === undefined) {
      return c.json(
        {
          message: " no se pudo encontrar el cash, ingrese un rango de  fechas",
        },
        400,
      );
    }
    //--------------
    const initdatecash = new Date(initdate_str);
    const finaldatecash = new Date(finaldate_str);
    const getamount = await AmountService.find_by_range_Date(
      initdatecash,
      finaldatecash,
      currencyParam,
    );
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ CashArray: getamount }, 200);
  },
);
//----post-----
CashRoutes.post(
  "/CashCreate",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", cashFilter),
  async (c) => {
    const cash = c.req.valid("json");
    const getamount = await AmountService.create(cash);
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ CashArray: getamount }, 200);
  },
);
CashRoutes.put(
  "/update_revenue",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", updateRevenue),
  async (c) => {
    const cash = c.req.valid("json");
    const getamount = await AmountService.update_revenue(
      cash.revenue,
      cash.date,
      cash.currency,
    );
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ CashArray: getamount }, 200);
  },
);

CashRoutes.put(
  "/update_expense",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", updateExpense),
  async (c) => {
    const cash = c.req.valid("json");
    const getamount = await AmountService.update_expense(
      cash.expense,
      cash.date,
      cash.currency,
    );
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ CashArray: getamount }, 200);
  },
);
CashRoutes.put(
  "/update_balance",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", updateCash),
  async (c) => {
    const cash = c.req.valid("json");
    const getamount = await AmountService.update_balance(
      cash.balance,
      cash.date,
      cash.currency,
    );
    if (getamount instanceof ErrorCash) {
      const message = getamount.messageError;
      return c.json({ message }, 400);
    }
    return c.json({ CashArray: getamount }, 200);
  },
);
