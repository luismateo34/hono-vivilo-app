import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import { updateShippingFilter, paymentFilter } from "src/payment/application/filter";
import {
  adminCookies,
  jwtAdminPayload,
} from "src/admin/infrastructure/Adminservice";
import { } from "src/payment/infrastructure/servicePayment";

type Variables = {
  jwtPayload: jwtAdminPayload;
};
//------------------
export const CashRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/payment",
);
