export enum Currency {
  USD = "USD",
  EUR = "EUR",
  ARG = "ARG",
}
//Monto, o saldo segun el tiempo
export interface Cash {
  revenue: number;
  expense: number;
  balance: number;
  date: Date;
  id_cash: number;
  currency: Currency;
}
//--------------
export type CashCreate = Omit<Cash, "id_cash">;
export class ErrorCash {
  constructor(private message: string) {}
  get messageError() {
    return this.message;
  }
}
