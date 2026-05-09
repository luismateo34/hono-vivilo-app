import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  CreateAdmin,
  UpdateAdmin,
  Id_admin,
} from "src/admin/application/filter";
import {
  AdminService,
  adminCookies,
  createAdmin,
  jwtAdminPayload,
} from "./Adminservice";
import { generateToken, generateRefreshToken } from "./jtw";

type Variables = {
  jwtPayload: jwtAdminPayload;
};
//------------------
export const AdminRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/admin",
);
AdminRoutes.post(
  "/create",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", CreateAdmin),
  async (c) => {
    const admin = c.req.valid("json");
    try {
      const resp = await AdminService.createAdmin(admin);
      if (resp === null) {
        return c.json({ message: "no se pudo crear el admin" }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);
//---------------------------------
AdminRoutes.get(
  "/find_byId",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
      if (id === undefined) {
        return c.json({ message: "no se pudo buscar el admin" }, 400);
      }
      const numID = parseInt(id);
      const resp = await AdminService.find_byId(numID);
      if (!resp) {
        return c.json({ message: "no se pudo borrar el admin" }, 400);
      }
      return c.json({ message: "ok" }, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);
//---------------------------------
AdminRoutes.get(
  "/find_email",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    try {
      const email = c.req.query("email");
      if (email === undefined) {
        return c.json({ message: "no se pudo encontrar el admin" }, 400);
      }
      const resp = await AdminService.find_byEmail(email);
      if (!resp) {
        return c.json({ message: "no se pudo borrar el admin" }, 400);
      }
      return c.json({ message: "ok" }, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);

//---------------------------------
AdminRoutes.delete(
  "/delete",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", Id_admin),
  async (c) => {
    const admin = c.req.valid("json");
    try {
      const resp = await AdminService.deleteAdmin(admin.id);
      if (!resp) {
        return c.json({ message: "no se pudo borrar el admin" }, 400);
      }
      return c.json({ message: "ok" }, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);

//---------------------------------
AdminRoutes.put(
  "/update",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", UpdateAdmin),
  async (c) => {
    const admin = c.req.valid("json");
    try {
      const obj: createAdmin = {
        email: admin.email,
        name: admin.name,
        password: admin.password,
      };
      const resp = await AdminService.update(admin.id, obj);
      if (resp === null) {
        return c.json({ message: "no se pudo actualizar el admin" }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo actualizar el admin" }, 400);
    }
  },
);
//----------------------------------
AdminRoutes.post("/login", zValidator("json", CreateAdmin), async (c) => {
  const admin = c.req.valid("json");
  try {
    const resp = await AdminService.login(admin);
    if (resp === null) {
      return c.json({ message: "no se pudo crear el admin" }, 400);
    }
    const jwt = await generateToken(resp.Admin_id, resp.name);
    const refreshToken = await generateRefreshToken(resp.Admin_id, resp.name);
    //-------------
    setCookie(c, adminCookies.adminCookie, jwt, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: 60 * 60 * 1,
    });
    setCookie(c, adminCookies.refreshAdmin, refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: 60 * 60 * 24,
    });

    return c.json(resp, 200);
  } catch {
    return c.json({ message: "no se pudo logear el admin" }, 401);
  }
});
//----------------------------------
AdminRoutes.post("/logout", async (c) => {
  deleteCookie(c, adminCookies.refreshAdmin);
  deleteCookie(c, adminCookies.adminCookie);

  return c.json({ message: "se ha cerrado la sesion" }, 200);
});
//------------------------------------
AdminRoutes.post(
  "/refresh",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.refreshAdmin,
  }),
  async (c) => {
    try {
      const payload = c.get("jwtPayload");
      const resp = await AdminService.find_byId(payload.Admin_id);
      if (resp === null) {
        return c.json({ message: "no se pudo refrescar el admin" }, 400);
      }
      const jwt = await generateToken(resp.Admin_id, resp.name);
      const refreshToken = await generateRefreshToken(resp.Admin_id, resp.name);
      //-------------
      setCookie(c, adminCookies.adminCookie, jwt, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 60 * 60 * 1,
      });
      setCookie(c, adminCookies.refreshAdmin, refreshToken, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 60 * 60 * 24,
      });

      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo refrescar el admin" }, 401);
    }
  },
);
