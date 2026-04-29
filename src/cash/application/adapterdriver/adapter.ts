import { createCashAdapter } from "./method/create";
import { updateCashAdapter } from "./method/update";
import { FindCashAdapter } from "./method/find";
import {
  facadeCash,
  CreateCash,
  findCash,
  UpdateCash,
} from "src/cash/domain/port/driver";
import { drivenCash } from "src/cash/domain/port/driven_cash";
import {
  Currency,
  Cash,
  ErrorCash,
  CashCreate,
} from "src/cash/domain/cash";

//--------------------------
export class facadeCashAdapter implements facadeCash {
  private createclass: CreateCash;
  private find: findCash;
  private update: UpdateCash;
  constructor(private dataquery: drivenCash) {
    this.createclass = new createCashAdapter(this.dataquery);
    this.find = new FindCashAdapter(this.dataquery);
    this.update = new updateCashAdapter(this.dataquery);
  }
  //------------------
  async update_revenue(
    revenue: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    return this.update.update_revenue(revenue, date, currency_type);
  }
  //--------------------
  async update_balance(
    balance: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    return this.update_balance(balance, date, currency_type);
  }
  //---------------------
  async find_byDate(
    date: Date,
    currency_type?: Currency,
  ): Promise<Cash | ErrorCash> {
    return this.find.find_byDate(date, currency_type);
  }
  //----------------------
  async update_expense(
    expense: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash> {
    return this.update.update_expense(expense, date, currency_type);
  }
  //--------------------------
  async find_by_range_Date(
    initdate: Date,
    finaldate: Date,
    currency_type?: Currency,
  ): Promise<Cash[] | ErrorCash> {
    return this.find.find_by_range_Date(initdate, finaldate, currency_type);
  }
  //--------------------------
  async create(cashObj: CashCreate): Promise<true | ErrorCash> {
    return this.createclass.create(cashObj);
  }
}
