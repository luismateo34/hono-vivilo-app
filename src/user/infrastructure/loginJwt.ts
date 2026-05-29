import { JwtUser } from "src/user/application/types/jwt";
import { UserService, ErrorUser } from "src/user/infrastructure/userservice";
import { sign } from "hono/jwt";
import { loadEnvFile } from "node:process";
try{
loadEnvFile("./.env");
}catch{
  console.info(" serverles environment file not found")
}

const generateToken = async (userId: number, name: string) => {
  const payloadObj: JwtUser = {
    name: name,
    userId: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1, // Expira en 1hs
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  const secret = process.env.SECRET;

  return await sign(payloadObj, secret);
};
//---------------------------
const generateRefreshToken = async (userId: number, name: string) => {
  const payloadObj: JwtUser = {
    userId: userId,
    name: name,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // Expira en 24hs
    iat: Math.floor(Date.now() / 1000), // Issued at
  };

  const secret = process.env.SECRET;

  return await sign(payloadObj, secret);
};

interface login {
  error: boolean;
  message: string;
  token?: string;
  refeshtoken?: string;
}

export const LoginJwt = async (
  email: string,
  password: string,
): Promise<login> => {
  try {
    const resp = await UserService.login(email, password);
    //mensaje de error
    if (resp instanceof ErrorUser) {
      const obj: login = {
        error: true,
        message: resp.messageError,
      };
      return obj;
    }
    //----------------------------
    const tokenJwt = await generateToken(resp.userId, resp.name);
    const jwtRefresh = await generateRefreshToken(resp.userId, resp.name);
    const obj: login = {
      error: false,
      message: "success",
      token: tokenJwt,
      refeshtoken: jwtRefresh,
    };
    return obj;
    //---------------------------
  } catch {
    const obj: login = {
      error: true,
      message: "Error al logearse",
    };
    return obj;
  }
};
//-----------------------------------------
export const RefreshJwt = async (
  userId: number,
  name: string,
): Promise<login> => {
  try {
    const tokenJwt = await generateToken(userId, name);
    const jwt: login = {
      error: false,
      message: "success",
      token: tokenJwt,
    };

    const jwtRefresh = await generateRefreshToken(userId, name);
    const objtoken: login = { ...jwt, refeshtoken: jwtRefresh };
    return objtoken;
  } catch {
    const objtoken: login = {
      error: false,
      message: "success",
    };
    return objtoken;
  }
};
