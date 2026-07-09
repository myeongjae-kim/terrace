import type { OwnerSession } from "#/core/auth/domain";

export interface VerifyGoogleOwnerUseCase {
	verifyGoogleOwner(input: { credential: string }): Promise<OwnerSession | null>;
}

