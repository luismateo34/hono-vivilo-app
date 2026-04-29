import {facadeCashAdapter } from "src/cash/application/adapterdriver/adapter";
import { Cashdatabase } from "./database";

const database = new Cashdatabase();
export const AmountService = new facadeCashAdapter(database);
export  { type Cash, ErrorCash, type CashCreate, Currency } from "src/cash/domain/cash";
