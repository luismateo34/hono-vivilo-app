export interface User {
  userId: number;
  name: string;
  email: string;
  password: string;
  verify: boolean;
}
//-------------------------------
export type createUser = Omit<User, 'userId' | 'verify'>;
export type getUser = Omit<User, 'password'>;

export interface paymentObj{
  id:number,
  amount:number,
  date:Date,
  productsId:number[],
}
export interface Payments {
  payments:paymentObj[],
}
//-------------------------------
export class ErrorUser {
  constructor(private message: string) {}
  get messageError(): string {
    return this.message;
  }
}
