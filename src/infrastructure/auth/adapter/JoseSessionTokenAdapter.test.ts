import { SignJWT } from "jose";
import { describe, expect, it } from "vitest";

process.env.DATABASE_URL ??= "postgres://user:password@localhost:5432/test";
process.env.JWT_SECRET = "test-secret-that-is-long-enough-for-hmac";
process.env.GOOGLE_LOGIN_CLIENT_ID ??= "test-client-id";
process.env.OWNER_SUB = "owner-sub";

const { JoseSessionTokenAdapter } = await import("./JoseSessionTokenAdapter");

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

describe("JoseSessionTokenAdapter", () => {
	it("signs and verifies an owner session", async () => {
		const adapter = new JoseSessionTokenAdapter();

		const token = await adapter.sign({ sub: "owner-sub" });

		await expect(adapter.verify(token)).resolves.toEqual({ sub: "owner-sub" });
	});

	it("rejects tampered tokens", async () => {
		const adapter = new JoseSessionTokenAdapter();
		const token = await adapter.sign({ sub: "owner-sub" });
		const [header, payload, signature] = token.split(".");
		const tamperedSignature = `${signature?.startsWith("a") ? "b" : "a"}${signature?.slice(1)}`;
		const tamperedToken = `${header}.${payload}.${tamperedSignature}`;

		await expect(adapter.verify(tamperedToken)).resolves.toBeNull();
	});

	it("rejects expired tokens", async () => {
		const adapter = new JoseSessionTokenAdapter();
		const expiredToken = await new SignJWT({ sub: "owner-sub" })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("-1s")
			.sign(secret);

		await expect(adapter.verify(expiredToken)).resolves.toBeNull();
	});
});
