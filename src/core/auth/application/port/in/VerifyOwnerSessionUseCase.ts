import type { OwnerSession } from "#/core/auth/domain";

export interface VerifyOwnerSessionUseCase {
	verifyOwnerSession(input: { token: string }): Promise<OwnerSession | null>;
}

