import { z } from "zod";

const envSchema = z.object({
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	GOOGLE_LOGIN_CLIENT_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
