import  "src/utils/dotenv";
//-----------------------
import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { UserAdminRoutes } from "src/user/infrastructure/adminRoutes";
import { UserRoutes } from "src/user/infrastructure/routes";
import { ProductRoutes } from "src/product/infrastructure/routes";
import { AdminRoutes } from "src/admin/infrastructure/routes";
import { CashRoutes } from "src/cash/infrastructure/routes";

const app = new Hono()

app.use(prettyJSON())
app.route("/", UserAdminRoutes)
app.route("/", UserRoutes)
app.route("/", ProductRoutes)
app.route("/", AdminRoutes)
app.route("/", CashRoutes)
export default app
