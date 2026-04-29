import {Category } from "src/product/domain/product";
import * as z from "zod";

const productFilter = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  price: z.number().nonnegative(),
  quantity: z.number().nonnegative(),
  imagesUrl: z.string().array(),
  categoryproduct: z.enum(Category),
  offert: z.boolean(),
  offertPercent: z.number().nonnegative().max(100).min(0),

});
const categoryFilter = z.object({
  categoryproduct: z.enum(Category),
})
//------------
  const nameFilter = z.object({
  name: z.string().min(3),
});
const descriptionFilter = z.object({
  description: z.string().min(3),
});
const priceFilter = z.object({
  price: z.number().min(0).nonnegative(),
});
const numberfilter = z.object({
  number: z.number().min(0).nonnegative(),
});
const rowfilter = z.object({
  number: z.number().nonnegative().min(0).optional(),
});
const offertFilter = z.object({
  boolean: z.boolean(),
})
const arrUrl = z.object({
  imagesUrl: z.string().array().optional(),
})
const offertPercentfilter = z.object({
  offertPercent: z.number().nonnegative().max(100).min(0),
})

export { offertPercentfilter ,arrUrl ,offertFilter ,rowfilter ,productFilter, nameFilter, descriptionFilter, priceFilter, numberfilter, categoryFilter };
