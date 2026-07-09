import { env } from "#/core/config/env";
import { Autowired } from "#/core/config/Autowired";
import type { SignOwnerSessionUseCase } from "./port/in/SignOwnerSessionUseCase";
import type { VerifyGoogleOwnerUseCase } from "./port/in/VerifyGoogleOwnerUseCase";
import type { VerifyOwnerSessionUseCase } from "./port/in/VerifyOwnerSessionUseCase";
import type { GoogleIdentityPort } from "./port/out/GoogleIdentityPort";
import type { SessionTokenPort } from "./port/out/SessionTokenPort";

export class AuthService
	implements
		VerifyGoogleOwnerUseCase,
		SignOwnerSessionUseCase,
		VerifyOwnerSessionUseCase
{
	constructor(
		@Autowired("GoogleIdentityPort")
		private readonly googleIdentityPort: GoogleIdentityPort,
		@Autowired("SessionTokenPort")
		private readonly sessionTokenPort: SessionTokenPort,
	) {}

	async verifyGoogleOwner(
		input: Parameters<VerifyGoogleOwnerUseCase["verifyGoogleOwner"]>[0],
	) {
		const account = await this.googleIdentityPort.verifyCredential({
			credential: input.credential,
			audience: env.GOOGLE_LOGIN_CLIENT_ID,
		});

		if (!account || account.sub !== env.OWNER_SUB) {
			return null;
		}

		return { sub: account.sub };
	}

	signOwnerSession(input: Parameters<SignOwnerSessionUseCase["signOwnerSession"]>[0]) {
		return this.sessionTokenPort.sign(input);
	}

	async verifyOwnerSession(
		input: Parameters<VerifyOwnerSessionUseCase["verifyOwnerSession"]>[0],
	) {
		const payload = await this.sessionTokenPort.verify(input.token);

		if (!payload || payload.sub !== env.OWNER_SUB) {
			return null;
		}

		return payload;
	}
}

