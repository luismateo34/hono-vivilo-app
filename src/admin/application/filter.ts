import * as z from "zod";
import type { createAdmin as CreateAdmintype, Admin } from "src/admin/domain/admin";

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
type createAdminZodType = z.infer<typeof CreateAdmin>;
export const __create_admin__: createAdminZodType = {}as CreateAdmintype
//----------------
export const UpdateAdmin = z.object({
  email: z.email(),
  name: z.string().min(3),
  password: z.string().min(8),
  id: z.number().nonnegative(),
});
