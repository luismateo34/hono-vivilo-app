import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  ErrorUser,
  UserService,
  createUser
} from "src/user/infrastructure/userservice";
import { createUserfilter } from "src/user/application/filter";
import {
  jwtAdminPayload,
  adminCookies,
} from "src/admin/infrastructure/Adminservice";
import {
  updateUser,
  updatePassword,
  updateEmail,
  emailfilter,
} from "src/user/application/filter";


type Variables = {
  Payload: jwtAdminPayload;
};
//------------------
export const UserAdminRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/user/admin",
);
UserAdminRoutes.post(
  "create",
  jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  zValidator("json", createUserfilter),
  async (c) => {
    try {
      const userObj = c.req.valid("json");
      const user = await UserService.createUser(userObj);
      if (user instanceof ErrorUser) {
        return c.json({ message: "no se pudo crear el admin" }, 400);
      }
      return c.json(user, 200);
    } catch {
        return c.json({ message: "no se pudo crear el admin" }, 400);
    }
  },
);
UserAdminRoutes.delete(
  "/deleteUser",
   jwt({
    secret: process.env.SECRET_ADMIN,
    alg: "HS256",
    cookie: adminCookies.adminCookie,
  }),
  async (c) => {
    try {
      const userid = c.req.param("id");
      //----------------------
      if (userid === undefined) {
        return c.json({ message: "no se pudo borrar el usuario" }, 400);
      }
      //----------------------
      const numId = parseInt(userid);
      if (isNaN(numId)) {
        return c.json({ message: "no se pudo borrar el usuario" }, 400);
      }
      //-----------------------
      const resp = await UserService.deleteUser(parseInt(userid));
      if (!resp) {
        return c.json({ message: "no se pudo borrar el admin" }, 400);
      }
      return c.json({ message: "ok" }, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 400);
    }
  },
);
//---put----
UserAdminRoutes.put(
  "/verify",
  zValidator("json", emailfilter),
  async (c) => {
    const user = c.req.valid("json");
    try {
      const obj = await UserService.verify(user.email);
      if (obj) {
        return c.json({ message: "error" }, 400);
      }
      return c.json(obj, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);
//------------
UserAdminRoutes.put(
  "/updateEmail",
  zValidator("json", updateEmail),
  async (c) => {
    const user = c.req.valid("json");
    try {
      const obj = await UserService.updateEmail(user.email, user.userId);
      if (obj instanceof ErrorUser) {
        return c.json({ message: `${obj.messageError}` }, 400);
      }
      return c.json(obj, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);
//----------------
UserAdminRoutes.put(
  "/updatePassword",
  zValidator("json", updatePassword),
  async (c) => {
    const user = c.req.valid("json");
    try {
      const obj = await UserService.updatePassword(user.password, user.userId);
      if (obj instanceof ErrorUser) {
        return c.json({ message: `${obj.messageError}` }, 400);
      }
      return c.json(obj, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);

//----------------
UserAdminRoutes.put(
  "/updateUser",
  zValidator("json", updateUser),
  async (c) => {
    const user = c.req.valid("json");
    try {
      const userObj: createUser = {
        email: user.email,
        name: user.name,
        password: user.password,
      };
      const obj = await UserService.updateUser(userObj, user.userId);
      if (obj instanceof ErrorUser) {
        return c.json({ message: `${obj.messageError}` }, 400);
      }
      return c.json(obj, 200);
    } catch {
      return c.json({ message: "error" }, 400);
    }
  },
);
//---get---
UserAdminRoutes.get(
  "/findUserByUser",
  async (c) => {
    try {
      const id = c.req.query("id");
      if (id === undefined) {
        return c.json({ message: "mail no puede ser undefined" }, 400);
      }
      const resp = await UserService.findPaymentUser(parseInt(id));
      if (resp instanceof ErrorUser) {
        return c.json({ message: `${resp.messageError}` }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);

//-------------------------
UserAdminRoutes.get(
  "/findUserById",
  async (c) => {
    try {
      const id = c.req.query("id");
      if (id === undefined) {
        return c.json({ message: "mail no puede ser undefined" }, 400);
      }
      const resp = await UserService.findUserById(parseInt(id));
      if (resp instanceof ErrorUser) {
        return c.json({ message: `${resp.messageError}` }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);
//-------------------------
UserAdminRoutes.get(
  "/findUserByEmail",
  async (c) => {
    try {
      const email = c.req.query("email");
      if (email === undefined) {
        return c.json({ message: "mail no puede ser undefined" }, 400);
      }
      const resp = await UserService.findUserByEmail(email);
      if (resp instanceof ErrorUser) {
        return c.json({ message: `${resp.messageError}` }, 400);
      }
      return c.json(resp, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);
