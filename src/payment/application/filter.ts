import *as z from "zod";
import {  Status } from "src/payment/domain/payment";


export const emailparse = z.object({
  email: z.email()
})
export const nameparce = z.object({
  name: z.string().min(3)
})
export const dateparce = z.object({
  date: z.date()
})
export const numberparce = z.object({
  number: z.number().nonnegative()
})
export const statusparce = z.object({
  status:z.enum(Status)
})
export const booleanParce = z.object({
  shipping: z.boolean(),
})

export const paymentFilter = z.object({
  amount: z.number().nonnegative(),
  date: z.date(),
  id_payment: z.number().nonnegative(),
  user_id: z.number().nonnegative(),
  user_email: z.email(),
  user_name: z.string().min(3),
  productsId: z.array(z.string()),
  status: z.enum(Status),
  shipping: z.boolean(),
});

