import { jwtVerify, SignJWT } from "jose";
import type { SessionTokenPort } from "#/core/auth/application/port/out/SessionTokenPort";
import { env } from "#/core/config/env";

const algorithm = "HS256";

function secretKey() {
	return new TextEncoder().encode(env.JWT_SECRET);
}

export class JoseSessionTokenAdapter implements SessionTokenPort {
	sign(input: Parameters<SessionTokenPort["sign"]>[0]) {
		return new SignJWT(input)
			.setProtectedHeader({ alg: algorithm })
			.setIssuedAt()
			.setExpirationTime("7d")
			.sign(secretKey());
	}

	async verify(token: string) {
		try {
			const { payload } = await jwtVerify(token, secretKey(), {
				algorithms: [algorithm],
			});

			if (typeof payload.sub !== "string") {
				return null;
			}

			return { sub: payload.sub };
		} catch {
			return null;
		}
	}
}

