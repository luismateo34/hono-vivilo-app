import * as z from "zod";
import { Status } from "src/payment/domain/payment";

export const emailparse = z.object({
  email: z.email(),
});
export const nameparce = z.object({
  name: z.string().min(3),
});
export const dateparce = z.object({
  date: z.date(),
});
export const numberparce = z.object({
  number: z.number().nonnegative(),
});
export const statusparce = z.object({
  status: z.enum(Status),
});
export const booleanParce = z.object({
  shipping: z.boolean(),
});
export const IdArray = z.object({
   idPayments: z.array(z.number()).min(1)
})
/*
interface createPayment {
  amount: number;
  date: Date;
  user_id: number;
  user_email: string;
  user_name: string;
  productsId: number[];
}
 */
export const CreatePaymentFilter = z.object({
  amount: z.number().nonnegative(),
  date: z.date(),
  user_id: z.number(),
  user_email: z.email(),
  user_name: z.string().min(3),
  productsId: z.array(z.number()),
});
/*
export interface Payment {
  amount: number;
  date: Date;
  id_payment: string;
  user_id: number;
  user_email: string;
  user_name: string;
  status: Status;
  productsId: number[];
  shipping: boolean;
}
 */
export const paymentFilter = z.object({
  amount: z.number().nonnegative(),
  date: z.date(),
  id_payment: z.number().nonnegative(),
  user_id: z.number(),
  user_email: z.email(),
  user_name: z.string().min(3),
  productsId: z.array(z.number()),
  status: z.enum(Status),
  shipping: z.boolean(),
});
export const updateShippingFilter = z.object({
  shipping: z.boolean(),
  id: z.number().nonnegative(),
});
