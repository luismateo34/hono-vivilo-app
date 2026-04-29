import { CreateCash } from "src/cash/domain/port/driver";
import { drivenCash } from "src/cash/domain/port/driven_cash";
import { CashCreate, ErrorCash } from "src/cash/domain/cash";
import { cashFilter } from "src/cash/application/filter";
import pino from "pino";

export class createCashAdapter implements CreateCash {
  constructor(private dataquery: drivenCash) {}
  async create(cashObj: CashCreate): Promise<true | ErrorCash> {
    try {
      cashFilter.parse(cashObj);
      const resp = await this.dataquery.create(cashObj);
      if (!resp) {
        throw new Error("error en la creacion del cash object");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      pino().info(err);
      return new ErrorCash(
        err.message ?? "error en la creacion del cash object",
      );
    }
  }
}
