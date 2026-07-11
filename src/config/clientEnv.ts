import { z } from "zod";

const clientEnvSchema = z.object({
	VITE_GOOGLE_LOGIN_CLIENT_ID: z.string(),
});

export const clientEnv = clientEnvSchema.parse({
	VITE_GOOGLE_LOGIN_CLIENT_ID: import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID,
});
