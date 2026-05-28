import { expect, vi, describe, test, beforeEach } from "vitest";
import { comparePassword, hashPassword } from "./criptUtils";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("criptoUtils", () => {
  test("hashPassword", async () => {
    const hash = await hashPassword("testPassword");
    expect(hash).toBeTypeOf("string");
  });
  test("comparePassword", async () => {
    const pass = "testPassword";
    const hash = await hashPassword(pass);
    const compareHash = await comparePassword(pass, hash);
    expect(compareHash).toBe(true);
  });
});
