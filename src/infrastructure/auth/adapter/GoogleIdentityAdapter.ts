import { OAuth2Client } from "google-auth-library";
import type { GoogleIdentityPort } from "#/core/auth/application/port/out/GoogleIdentityPort";

export class GoogleIdentityAdapter implements GoogleIdentityPort {
	async verifyCredential(
		input: Parameters<GoogleIdentityPort["verifyCredential"]>[0],
	) {
		const client = new OAuth2Client(input.audience);
		const ticket = await client.verifyIdToken({
			idToken: input.credential,
			audience: input.audience,
		});
		const payload = ticket.getPayload();

		if (!payload?.sub) {
			return null;
		}

		return { sub: payload.sub };
	}
}
