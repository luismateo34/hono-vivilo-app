export interface Admin {
  name: string;
  email: string;
  password: string;
  Admin_id: number;
}
export type getAdmin = Omit<Admin, "password">;
export type createAdmin = Omit<Admin, "Admin_id">;
