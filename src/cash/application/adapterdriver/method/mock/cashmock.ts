import { Cash, CashCreate, Currency } from "src/cash/domain/cash";
import { drivenCash } from "src/cash/domain/port/driven_cash";

export class CashMock implements drivenCash {
  async create(amountObj: CashCreate): Promise<boolean> {
    try {
      const curr = amountObj.balance >= 0;
      if (!curr) {
        throw new Error("balance debe ser mayor a 0");
      }
      return true;
    } catch {
      return false;
    }
  }
  async findby_range_Date(
    initdate: Date,
    finaldate: Date,
    currency_type: Currency,
  ): Promise<Cash[] | null> {
    try {
      const cashOne: Cash = {
        balance: 360,
        currency: currency_type,
        date: new Date(initdate),
        expense: 890,
        id_cash: 11,
        revenue: 530,
      };
      const cashTwo: Cash = {
        balance: 360,
        currency: currency_type,
        date: new Date(finaldate),
        expense: 890,
        id_cash: 11,
        revenue: 530,
      };
      return [cashOne, cashTwo];
    } catch {
      return null;
    }
  }
  async findbyDate(
    date_find: Date,
    currency_type: Currency,
  ): Promise<Cash | null> {}
  async update_balance(
    number: number,
    date: Date,
    currency_type: Currency,
  ): Promise<boolean> {}
  async update_expense(
    number: number,
    date: Date,
    currency_type: Currency,
  ): Promise<boolean> {}
  async update_revenue(
    number: number,
    date: Date,
    currency_type: Currency,
  ): Promise<boolean> {}
}
