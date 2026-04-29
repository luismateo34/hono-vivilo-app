import { type drivenCash } from "src/cash/domain/port/driven_cash";
import { Currency, Cash, CashCreate } from "src/cash/domain/cash";
import { schemaCash } from "./schema";
import pino from "pino";
import { Op } from "sequelize";

export class Cashdatabase implements drivenCash {
  async create(amountObj: CashCreate): Promise<boolean> {
    try {
      const resp = await schemaCash.create(amountObj);
      if (resp.id_cash === undefined) {
        throw new Error("error al crear el objeto cash");
      }
      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "createAmount" });
      logs.info(err.message ?? "error al crear el objeto cash");
      return false;
    }
  }
  //------------------------
  async findby_range_Date(
    initdate: Date,
    finaldate: Date,
    currency_type: Currency,
  ): Promise<Cash[] | null> {
    try {
      const resp = await schemaCash.findAll({
        where: {
          date: { [Op.between]: [initdate, finaldate] },
          currency: currency_type,
        },
      });
      const arrobj = resp.map((el) => {
        const { balance, currency, date, expense, id_cash, revenue } = el;
        const obj: Cash = {
          balance,
          currency,
          date,
          expense,
          id_cash,
          revenue,
        };
        return obj;
      });
      return arrobj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "findby_range_Date" });
      logs.info(
        err.message ?? "error al buscar objetos cash en una rango de fechas",
      );
      return null;
    }
  }
  //------------------------
  async findbyDate(
    date_find: Date,
    currency_type: Currency,
  ): Promise<Cash | null> {
    try {
      const resp = await schemaCash.findOne({
        where: { date: date_find, currency: currency_type },
      });
      if (resp === null) {
        return null;
      }
      const { balance, currency, date, expense, id_cash, revenue } = resp;
      const obj: Cash = {
        balance,
        currency,
        date,
        expense,
        id_cash,
        revenue,
      };
      return obj;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "cash-findbyDate" });
      logs.info(err.message ?? "error al buscar objetos cash en una fecha ");
      return null;
    }
  }
  //------------------------
  async update_balance(
    number: number,
    date: Date,
    currency_type: Currency,
  ): Promise<boolean> {
    try {
      await schemaCash.update(
        { balance: number },
        { where: { date: date, currency: currency_type }},
      );
      return true;
    } catch (e) {
      const err = e as Error;
      const logs = pino().child({ location: "cash-updateBalance" });
      logs.info(err.message ?? "error al actulizar el balance ");
      return false;
    }
  }
  //------------------------
  async update_expense(
    number: number,
    date: Date,
    currency_type: Currency,
  ): Promise<boolean> {
    try{
      await schemaCash.update(
        { expense: number },
        { where: { date: date, currency: currency_type }},
      );
      return true;

    }catch(e){
     const err = e as Error;
      const logs = pino().child({ location: "cash-update-expense" });
      logs.info(err.message ?? "error al actulizar el expense ");
      return false;

    }
  }
  //------------------------
 async   update_revenue(number: number, date: Date, currency_type: Currency): Promise<boolean> {
     try{
      await schemaCash.update(
        { revenue: number },
        { where: { date: date, currency: currency_type }},
      );
      return true;

    }catch(e){
     const err = e as Error;
      const logs = pino().child({ location: "cash-update-revenue" });
      logs.info(err.message ?? "error al actulizar revenue ");
      return false;

    }

  }
}
