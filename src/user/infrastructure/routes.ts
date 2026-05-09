import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { jwt } from "hono/jwt";
import {
  createUser,
  ErrorUser,
  getUser,
  JwtUser,
  User,
  UserService,
  UserCookies,
} from "src/user/infrastructure/userservice";
import {
  createUserfilter,
  emailfilter,
  Namefilter,
  numberfilter,
  Passwordfilter,
  Loggin,
} from "src/user/application/filter";
import { LoginJwt, RefreshJwt } from "./loginJwt";
import { UserAdapter } from "../application/adapterdriver/adapter";

type Variables = {
  jwtPayload: JwtUser;
};
//------------------
export const UserRoutes = new Hono<{ Variables: Variables }>().basePath(
  "/user",
);
//---get---
UserRoutes.get(
  "/findUserByUser",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const id = c.req.query("id");
      if ( id === undefined) {
        return c.json({ message: "mail no puede ser undefined" }, 400);
      }
      const resp = await UserService.findPaymentUser(parseInt(id))
      if ( resp instanceof ErrorUser ) {
        return c.json({ message: `${ resp.messageError}` }, 400);
      }
      return c.json( resp, 200);
    } catch {
      return c.json({ message: "no se pudo borrar el admin" }, 403);
    }
  },
);

//-------------------------
UserRoutes.get(
  "/findUserById",
  jwt({
    secret: process.env.SECRET,
    alg: "HS256",
    cookie: UserCookies.userCookie,
  }),
  async (c) => {
    try {
      const id = c.req.query("id");
      if ( id === undefined) {
        return c.json({ message: "mail no puede ser undefined" }, 400);
      }
      const resp = await UserService.findUserById(parseInt(id))
      if ( resp instanceof ErrorUser ) {
        return c.json({ message: `${ resp.messageError}` }, 400);
      }
      return c.json( resp, 200);
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
      if ( resp instanceof ErrorUser ) {
        return c.json({ message: `${ resp.messageError}` }, 400);
      }
      return c.json( resp, 200);
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
