import * as z from "zod";

//-------------------
export const Password = z.object({
  password: z.string().min(8),
});
export const Name = z.object({
  name: z.string().min(3),
});
export const Token = z.object({
  token: z.string().min(3),
});

//-----------------
//---------------
export const Id_admin = z.object({
  id: z.number().nonnegative(),
});
//--------------
export const Email = z.object({
  email: z.email(),
});
//---------------
export const CreateAdmin = z.object({
  email: z.email(),
  name: z.string().min(3),
  password: z.string().min(8),
});
//----------------
export const UpdateAdmin = z.object({
  email: z.email(),
  name: z.string().min(3),
  password: z.string().min(8),
  id: z.number().nonnegative(),
});
