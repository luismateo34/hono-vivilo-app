import * as z from "zod";
import { Currency } from "src/cash/domain/cash";

const cashFilter = z.object({
  revenue: z.number().nonnegative(),
  expense: z.number().nonnegative(),
  balance: z.number().nonnegative(),
  date: z.date(),
  id_amount: z.number(),
  currency: z.enum(Currency)
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

const updateRevenue = z.object({
  date: z.date(),
  currency: z.enum(Currency).optional(),
  revenue: z.number().nonnegative(),
})


const updateExpense = z.object({
  date: z.date(),
  currency: z.enum(Currency).optional(),
  expense: z.number().nonnegative(),
})

//----------------
const updateCash = z.object({
  date: z.date(),
  currency: z.enum(Currency).optional(),
  balance: z.number().nonnegative(),
})

export { numberFilter, cashFilter, dateFilter, currencyFilter, updateCash, updateExpense, updateRevenue };
