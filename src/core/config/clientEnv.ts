import { z } from "zod";

const clientEnvSchema = z.object({
	VITE_GOOGLE_LOGIN_CLIENT_SECRET: z.string(),
	VITE_GOOGLE_LOGIN_CLIENT_ID: z.string(),
});

export const clientEnv = clientEnvSchema.parse({
	VITE_GOOGLE_LOGIN_CLIENT_SECRET: process.env.VITE_GOOGLE_LOGIN_CLIENT_SECRET,
	VITE_GOOGLE_LOGIN_CLIENT_ID: process.env.VITE_GOOGLE_LOGIN_CLIENT_ID,
});
