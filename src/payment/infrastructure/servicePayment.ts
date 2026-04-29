import { FacedePaymentAdapter } from "src/payment/application/adapterDriver/adapter";
import { databasePayment } from "./database";

const database = new databasePayment();
export const facade = new FacedePaymentAdapter(database);
export {
 type  Payment,
  ErrorPayment,
  Status,
} from "src/payment/domain/payment";

