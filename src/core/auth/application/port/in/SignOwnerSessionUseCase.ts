import type { OwnerSession } from "#/core/auth/domain";

export interface SignOwnerSessionUseCase {
	signOwnerSession(input: OwnerSession): Promise<string>;
}

