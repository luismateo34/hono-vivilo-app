import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  ErrorUser,
  JwtUser,
  UserService,
  UserCookies,
  createUser,
} from "src/user/infrastructure/userservice";
import {
  Loggin,
  updateUser,
  updatePassword,
  updateEmail,
  emailfilter,
} from "src/user/application/filter";
import { LoginJwt, RefreshJwt } from "./loginJwt";

type Variables = {
  jwtPayload: JwtUser;
};
//------------------
export const UserRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/user",
);
//----delete---
UserRoutes.delete(
  "/deleteUser/:id",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const payload = c.get("jwtPayload");
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
      if (numId == payload.userId) {
        return c.json({ message: "no se pudo borrar el usuario" }, 400);
      }
      //-----------------------
      if (numId !== payload.userId) {
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
UserRoutes.put(
  "/verify",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
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
UserRoutes.put(
  "/updateEmail",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
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
UserRoutes.put(
  "/updatePassword",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
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
UserRoutes.put(
  "/updateUser",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
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
UserRoutes.get(
  "/findPaymentUserbyId/:id",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
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
UserRoutes.get(
  "/findUserById/:id",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const id = c.req.param("id");
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
UserRoutes.get(
  "/findUserByEmail",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
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

//----post--
UserRoutes.post("/logout", async (c) => {
  deleteCookie(c, UserCookies.userCookie);
  deleteCookie(c, UserCookies.refreshUserCookies);
  return c.json({ message: "se ha cerrado la sesion" }, 200);
});
//--------------
UserRoutes.post(
  "RefreshJwt",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.refreshUserCookies,
  }),
  async (c) => {
    try {
      const payload = c.get("jwtPayload");
      const Refresh = await RefreshJwt(payload.userId, payload.name);
      if (Refresh.error) {
        return c.json({ message: `${Refresh.message}` }, 400);
      }
      if (Refresh.token === undefined || Refresh.refeshtoken === undefined) {
        return c.json({ message: `${Refresh.message}` }, 400);
      }
      setCookie(c, UserCookies.userCookie, Refresh.token as string, {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 60 * 60 * 1,
      });
      setCookie(
        c,
        UserCookies.refreshUserCookies,
        Refresh.refeshtoken as string,
        {
          httpOnly: true,
          sameSite: "Strict",
          secure: true,
          maxAge: 60 * 60 * 24,
        },
      );
    } catch {
      return c.json({ message: "no se pudo logear el admin" }, 401);
    }
  },
);
//-------------
UserRoutes.post("/login", zValidator("json", Loggin), async (c) => {
  try {
    const loggin = c.req.valid("json");
    const jwtoken = await LoginJwt(loggin.email, loggin.password);
    if (jwtoken.error) {
      return c.json({ message: `${jwtoken.message}` }, 400);
    }
    //-------------
    if (jwtoken.token === undefined || jwtoken.refeshtoken === undefined) {
      return c.json({ message: `${jwtoken.message}` }, 400);
    }
    //-------------
    setCookie(c, UserCookies.userCookie, jwtoken.token as string, {
      httpOnly: true,
      sameSite: "Strict",
      secure: true,
      maxAge: 60 * 60 * 1,
    });
    setCookie(
      c,
      UserCookies.refreshUserCookies,
      jwtoken.refeshtoken as string,
      {
        httpOnly: true,
        sameSite: "Strict",
        secure: true,
        maxAge: 60 * 60 * 24,
      },
    );

    return c.json({ message: "success " }, 200);
  } catch {
    return c.json({ message: "no se pudo logear el admin" }, 401);
  }
});
