import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	GOOGLE_LOGIN_CLIENT_ID: z.string(),
	OWNER_SUB: z.string(),
});

export const env = envSchema.parse({
	...process.env,
	GOOGLE_LOGIN_CLIENT_ID:
		process.env.GOOGLE_LOGIN_CLIENT_ID ??
		process.env.VITE_GOOGLE_LOGIN_CLIENT_ID,
});
