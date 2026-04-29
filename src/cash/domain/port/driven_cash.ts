import type {  Currency, CashCreate, Cash } from "src/cash/domain/cash";

export interface drivenCash{
  create(amountObj: CashCreate): Promise<boolean>
  update_revenue(number: number, date: Date, currency_type: Currency): Promise<boolean>
  update_expense(number: number, date: Date, currency_type: Currency): Promise<boolean>
  update_balance(number: number, date: Date, currency_type: Currency): Promise<boolean>
  findbyDate(date_find: Date, currency_type: Currency): Promise<Cash| null>
  findby_range_Date(initdate: Date, finaldate: Date, currency_type: Currency): Promise<Cash[] | null>
}

