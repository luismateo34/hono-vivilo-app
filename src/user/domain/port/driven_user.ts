import type { createUser, getUser, User, Payments } from "src/user/domain/user";

interface Create {
  createUser(user: createUser): Promise<boolean>;
}
//------------------------
interface Update {
  updateUser(user: createUser, userId: number): Promise<getUser | null>;
  updatePassword(password: string, userId: number): Promise<getUser | null>;
  updateEmail(email: string, userId: number): Promise<getUser | null>;
  verify( email: string): Promise<boolean>
}
//-----------------------
interface FindUser {
  findUserById(userId: number): Promise<getUser | null>;
  findUserByEmail(email: string): Promise<getUser | null>;
  findPaymentUser(userId: number): Promise<Payments | null>;
}
//------------------------
interface Delete {
  deleteUser(userId: number): Promise<boolean>;
}
//-----------------------
export interface dataqueryUser extends Create, Update, FindUser, Delete {
 loggin(email: string): Promise<User | null>;
}
