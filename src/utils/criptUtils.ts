import { scrypt, randomBytes, timingSafeEqual  } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number
) => Promise<Buffer>;
/**
 * Genera un hash seguro con sal incluida.
 * Formato de salida: "salt:hash" (hexadecimal)
 */
export async function hashPassword(password:string):Promise<string> {
  const salt = randomBytes(16).toString('hex'); // Sal aleatoria de 16 bytes
  const derivedKey = await scryptAsync(password, salt, 64);
  return `${salt}:${derivedKey.toString('hex')}`;
}
/**
 * Compara una contraseña en texto plano con el hash almacenado.
 * @param password contraseña en texto plano
 * @param hashPassword  contraseña encriptada
 */
export async function comparePassword(password:string, hashPassword:string):Promise<boolean> {
  const [salt, hash] = hashPassword.split(':');
  const hashBuffer = Buffer.from(hash, 'hex');
  const derivedKey = await scryptAsync(password, salt, 64);
  const access = timingSafeEqual(hashBuffer, derivedKey)
  return access
}
