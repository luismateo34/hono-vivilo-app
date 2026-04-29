import type { Delete } from "src/user/domain/port/userdriver";
import type { dataqueryUser } from "src/user/domain/port/driven_user";
import { numberfilter } from "src/user/application/filter";

export class DeleteUserAdapter implements Delete {
  constructor(private readonly userDriver: dataqueryUser) {}

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const { success } = numberfilter.safeParse({ number: userId });
      if (!success) {
        return false;
      }
      const response = await this.userDriver.deleteUser(userId);
      return response;
    } catch {
      return false;
    }
  }
}
