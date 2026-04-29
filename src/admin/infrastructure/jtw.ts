import { sign } from "hono/jwt";
import { CreateAdmin } from "src/admin/application/filter";
import { jwtAdminPayload } from "./Adminservice";

export const generateToken = async (adminId: number, name: string) => {
  const payloadObj: jwtAdminPayload = {
    Admin_id: adminId,
    name: name,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1, // Expira en 24hs
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  // Usamos el SECRET que ya tenés tipado en tus envs
  const secret = process.env.SECRET_ADMIN;

  // hono/jwt usa HS256 por defecto si no especificás algoritmo
  return await sign(payloadObj, secret);
};
export const generateRefreshToken = async (adminId: number, name: string) => {
  const payloadObj: jwtAdminPayload = {
    Admin_id: adminId,
    name: name,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 24hs
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  const secret = process.env.SECRET_ADMIN;

  // hono/jwt usa HS256 por defecto si no especificás algoritmo
  return await sign(payloadObj, secret);
};
