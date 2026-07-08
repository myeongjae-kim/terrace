import type { OwnerSession } from "#/core/auth/domain";

export interface SessionTokenPort {
	sign(payload: OwnerSession): Promise<string>;
	verify(token: string): Promise<OwnerSession | null>;
}

