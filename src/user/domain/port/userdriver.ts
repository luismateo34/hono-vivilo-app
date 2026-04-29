import type { ErrorUser, createUser, getUser, Payments } from "src/user/domain/user";

export interface Create{
   createUser(user: createUser): Promise<getUser | ErrorUser>
}
//------------------------
export interface Update{
   updateUser(user: createUser, userId: number): Promise<getUser | ErrorUser>
   updatePassword(password: string, userId: number): Promise<getUser | ErrorUser>
   updateEmail(email: string, userId: number): Promise<getUser | ErrorUser>
  verify( email: string): Promise<boolean>
}
//-----------------------
export interface FindUser{
  findUserById(userId: number): Promise<getUser | ErrorUser>
  findPaymentUser(userId: number): Promise<Payments | ErrorUser>
  findUserByEmail(email: string): Promise<getUser | ErrorUser>
}
//------------------------
export interface Delete{
  deleteUser(userId: number): Promise<boolean>
}
//----------------------
export interface FacadesUser extends Create, FindUser, Update, Delete {
  login(email: string, password: string): Promise<getUser | ErrorUser>
}
