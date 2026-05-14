import * as z from "zod";

export const createUserfilter = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  verify: z.boolean(),
});
//-----------------
export const numberfilter = z.object({
  number:z.number().nonnegative(),
})
//----------------------
export const Passwordfilter = z.object({
  password: z.string().min(8),
})
export const Namefilter = z.object({
  name: z.string().min(3),
})

//----------------
export const Loggin = z.object({
  email: z.email(),
  password: z.string().min(8),
})
//----------------
export const emailfilter = z.object({
  email: z.email()
})
//------------------
export const updatePassword = z.object({
  userId:z.number().nonnegative(),
  password: z.string().min(8),
})
//-------------------
export const updateEmail = z.object({
  userId:z.number().nonnegative(),
  email: z.email()
})
//-------------------
export const updateUser = z.object({
  userId:z.number().nonnegative(),
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),

})
