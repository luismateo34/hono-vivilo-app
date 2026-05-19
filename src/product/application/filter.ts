import { Category } from "src/product/domain/product";
import * as z from "zod";

export const productFilter = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
  imagesUrl: z.string().array(),
  categoryproduct: z.enum(Category),
  offert: z.boolean(),
  offertPercent: z.number().nonnegative().max(100).min(0),
});
//----------
export const categoryFilter = z.object({
  categoryproduct: z.enum(Category),
});
//------------
export const nameFilter = z.object({
  name: z.string().min(3),
});
//----------
export const descriptionFilter = z.object({
  description: z.string().min(3),
});
//----------
export const priceFilter = z.object({
  price: z.number().min(0).nonnegative(),
});
//----------
export const numberfilter = z.object({
  number: z.number().min(0).nonnegative(),
});
//----------
export const rowfilter = z.object({
  number: z.number().nonnegative().min(0).optional(),
});
//----------
export const offertFilter = z.object({
  boolean: z.boolean(),
});
//----------
export const arrUrl = z.object({
  imagesUrl: z.string().array().optional(),
});
//----------
export const offertPercentfilter = z.object({
  offertPercent: z.number().nonnegative().max(100).min(0),
});

//----------
/*
  name: string;
  description: string;
  price: number;
  quantity: number;
  imagesUrl:string[];
  categoryproduct: Category;
  offert: boolean;
  offertPercent: number;
  productId: number;
 */
export const updateProductFilter = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
  imagesUrl: z.string().array(),
  categoryproduct: z.enum(Category),
  offert: z.boolean(),
  offertPercent: z.number().nonnegative().max(100).min(0),
  productId: z.number().nonnegative(),
});
//----------
export const changecuantityFilter = z.object({
  productId: z.number().min(0).nonnegative(),
  quantity: z.number().min(0).nonnegative(),
});
//----------
export const changePriceFilter = z.object({
  productId: z.number().min(0).nonnegative(),
  price: z.number().min(0).nonnegative(),
});
//----------
export const changeOffertFilter = z.object({
  productId: z.number().min(0).nonnegative(),
  offert: z.boolean(),
  offertPercent: z.number().nonnegative().max(100).min(0),
});
//----------
export const changeImage = z.object({
  productId: z.number().min(0).nonnegative(),
  imageArr: z.string().array(),
});
