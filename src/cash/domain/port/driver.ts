import type {
  Cash,
  CashCreate,
  ErrorCash,
  Currency,
} from "src/cash/domain/cash";

export interface CreateCash {
  create(cashObj: CashCreate ): Promise<true | ErrorCash>;
  }
//---------------------------
export interface UpdateCash {
  update_revenue(
    revenue: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash>;
  update_expense(
    expense: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash>;
  update_balance(
    balance: number,
    date: Date,
    currency_type?: Currency,
  ): Promise<true | ErrorCash>;
  }
//--------------------------
export interface findCash {
  find_byDate(date: Date, currency_type?: Currency): Promise<Cash | ErrorCash>;
  find_by_range_Date(
    initdate: Date,
    finaldate: Date,
    currency_type?: Currency,
  ): Promise<Cash[] | ErrorCash>;
}
//-----------------
export interface facadeCash extends CreateCash, UpdateCash, findCash {}
