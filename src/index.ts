//-----------------------
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { UserAdminRoutes } from "src/user/infrastructure/adminRoutes";
import { UserRoutes } from "src/user/infrastructure/routes";
import { ProductRoutes } from "src/product/infrastructure/routes";
import { AdminRoutes } from "src/admin/infrastructure/routes";
import { CashRoutes } from "src/cash/infrastructure/routes";
import { mercadopagowebhook, PaymentRoutes } from "src/payment/infrastructure/routes";
import { PaymentAdminRoutes } from "src/payment/infrastructure/adminRoutes";
import { PaymentUserRoutes } from "src/payment/infrastructure/userRoutes";

const app = new Hono()

app.use(prettyJSON())
app.route("/", UserAdminRoutes)
app.route("/", UserRoutes)
app.route("/", ProductRoutes)
app.route("/", AdminRoutes)
app.route("/", CashRoutes)
app.route("/", mercadopagowebhook)
app.route("/", PaymentRoutes)
app.route("/", PaymentAdminRoutes)
app.route("/", PaymentUserRoutes)
export default app
