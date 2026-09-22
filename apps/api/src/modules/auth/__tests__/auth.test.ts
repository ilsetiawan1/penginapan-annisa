import { describe, expect, it } from "bun:test";
import { AuthService } from "../auth.service";

describe("🔐 Auth Module Service Tests", () => {
  it("should successfully login with valid owner credentials", async () => {
    const authService = new AuthService();
    const session = await authService.login({
      email: "owner@penginapan-annisa.com",
      password: "admin123",
    });

    expect(session).toBeDefined();
    expect(session.user.email).toBe("owner@penginapan-annisa.com");
    expect(session.user.role).toBe("owner");
    expect(session.token).toBeTypeOf("string");
  });

  it("should successfully login with valid staff credentials", async () => {
    const authService = new AuthService();
    const session = await authService.login({
      email: "staff@penginapan-annisa.com",
      password: "staff123",
    });

    expect(session).toBeDefined();
    expect(session.user.email).toBe("staff@penginapan-annisa.com");
    expect(session.user.role).toBe("staff");
  });

  it("should reject login with wrong password", async () => {
    const authService = new AuthService();
    expect(
      authService.login({
        email: "owner@penginapan-annisa.com",
        password: "wrongpassword",
      }),
    ).rejects.toThrow("Email atau password salah.");
  });

  it("should reject login with non-existent email", async () => {
    const authService = new AuthService();
    expect(
      authService.login({
        email: "unknown@example.com",
        password: "admin123",
      }),
    ).rejects.toThrow("Email atau password salah.");
  });
});
