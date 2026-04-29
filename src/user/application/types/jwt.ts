import { User } from "src/user/domain/user"

export type JwtUser = Pick<User, "userId"  | "name" >
