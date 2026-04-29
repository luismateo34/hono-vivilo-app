import { findCash } from "src/cash/domain/port/driver";
import { drivenCash } from "src/cash/domain/port/driven_cash";
import { Cash, Currency, ErrorCash } from "src/cash/domain/cash";
import { dateFilter, currencyFilter } from "src/cash/application/filter";
import pino from "pino";

export class FindCashAdapter implements findCash {
  constructor(private dataquery: drivenCash) {}
  async find_by_range_Date(
    initdate: Date,
    finaldate: Date,
    currency_type?: Currency,
  ): Promise<Cash[] | ErrorCash> {
    try {
      dateFilter.parse({ date: initdate });
      dateFilter.parse({ date: finaldate });
      currencyFilter.parse({ currency: currency_type });

      const result = await this.dataquery.findby_range_Date(
        initdate,
        finaldate,
        currency_type ?? Currency.ARG,
      );
      if (result === null) {
        throw new ErrorCash("No se encontraron resultados");
      }
      return result;
    } catch (e) {
      const err = e as Error;
      pino().info(err);
      return new ErrorCash(err.message ?? "error en la busqueda del amount");
    }
  }
  //-------------------------------
  async find_byDate(
    date: Date,
    currency_type?: Currency,
  ): Promise<Cash | ErrorCash> {
    try {
      dateFilter.parse({ date: date });
      currencyFilter.parse({ currency: currency_type });
      const resp = await this.dataquery.findbyDate(
        date,
        currency_type ?? Currency.ARG,
      );
      if (resp === null) {
        throw new ErrorCash("No se encontraron resultados");
      }
      return resp;
    } catch (e) {
      const err = e as Error;
      pino().info(err);
      return new ErrorCash(err.message ?? "error en la busqueda del amount");
    }
  }
}
