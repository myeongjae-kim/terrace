import { describe, expect, it } from "vitest";
import type { GoogleIdentityPort } from "./port/out/GoogleIdentityPort";
import type { SessionTokenPort } from "./port/out/SessionTokenPort";

process.env.DATABASE_URL ??= "postgres://user:password@localhost:5432/test";
process.env.JWT_SECRET ??= "test-secret-that-is-long-enough-for-hmac";
process.env.GOOGLE_LOGIN_CLIENT_ID = "test-client-id";
process.env.OWNER_SUB = "owner-sub";

const { AuthService } = await import("./AuthService");

function googlePort(sub: string | null): GoogleIdentityPort {
	return {
		async verifyCredential() {
			return sub ? { sub } : null;
		},
	};
}

const sessionTokenPort: SessionTokenPort = {
	async sign(payload) {
		return payload.sub;
	},
	async verify(token) {
		return { sub: token };
	},
};

describe("AuthService", () => {
	it("accepts the configured owner Google subject", async () => {
		const service = new AuthService(googlePort("owner-sub"), sessionTokenPort);

		await expect(
			service.verifyGoogleOwner({ credential: "credential" }),
		).resolves.toEqual({ sub: "owner-sub" });
	});

	it("rejects any other Google subject", async () => {
		const service = new AuthService(googlePort("other-sub"), sessionTokenPort);

		await expect(
			service.verifyGoogleOwner({ credential: "credential" }),
		).resolves.toBeNull();
	});

	it("rejects sessions not owned by the configured subject", async () => {
		const service = new AuthService(googlePort("owner-sub"), sessionTokenPort);

		await expect(service.verifyOwnerSession({ token: "other-sub" })).resolves.toBeNull();
	});
});

