import * as z from "zod";
import { Currency } from "src/cash/domain/cash";

const cashFilter = z.object({
  revenue: z.number().nonnegative(),
  expense: z.number().nonnegative(),
  balance: z.number().nonnegative(),
  date: z.date(),
  id_amount: z.number(),
});
//------------------------
const dateFilter = z.object({
  date: z.date(),
});
//----------------------------
//
const numberFilter = z.object({
  number: z.number().nonnegative(),
});

const currencyFilter = z.object({
  currency: z.enum(Currency).optional(),
});
export { numberFilter, cashFilter, dateFilter, currencyFilter };
