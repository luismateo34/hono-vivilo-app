import { UpdateCash } from "src/cash/domain/port/driver";
import { drivenCash } from "src/cash/domain/port/driven_cash";
import { Currency, ErrorCash } from "src/cash/domain/cash";
import {
  dateFilter,
  currencyFilter,
  numberFilter,
} from "src/cash/application/filter";
import pino from "pino";

export class updateCashAdapter implements UpdateCash {
  constructor(private dataquery: drivenCash) {}
  async update_balance(
    balance: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    try {
      dateFilter.parse({ date: date });
      currencyFilter.parse({ currency: currency_type });
      numberFilter.parse({ number: balance });
      const resp = await this.dataquery.update_balance(
        balance,
        date,
        currency_type ?? Currency.ARG,
      );
      if (!resp) {
        throw new Error("error al actualizar el balance");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      pino().info(err.message ?? "error al actualizar el balance");
      return new ErrorCash(err.message);
    }
  }
  //---------------------------------
  async update_expense(
    expense: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    try {
      dateFilter.parse({ date: date });
      currencyFilter.parse({ currency: currency_type });
      numberFilter.parse({ number: expense });

      const resp = await this.dataquery.update_expense(
        expense,
        date,
        currency_type ?? Currency.ARG,
      );
      if (!resp) {
        throw new Error("error al actualizar el gasto");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      pino().info(err.message ?? "error al actualizar el gasto");
      return new ErrorCash(err.message);
    }
  }
  //------------------------------
  async update_revenue(
    revenue: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    try {
      dateFilter.parse({ date: date });
      currencyFilter.parse({ currency: currency_type });
      numberFilter.parse({ number: revenue });

      const resp = await this.dataquery.update_revenue(
        revenue,
        date,
        currency_type ?? Currency.ARG,
      );
      if (!resp) {
        throw new Error("error al actualizar ingresos");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      pino().info(err.message ?? "error al actualizar ingresos");
      return new ErrorCash(err.message);
    }
  }
}
