import type { GoogleAccount } from "#/core/auth/domain";

export interface GoogleIdentityPort {
	verifyCredential(input: {
		credential: string;
		audience: string;
	}): Promise<GoogleAccount | null>;
}

