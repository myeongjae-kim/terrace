import { redirect } from "@tanstack/react-router";
import {
	createMiddleware,
	createServerFn,
	createServerOnlyFn,
} from "@tanstack/react-start";
import { z } from "zod";

const sessionCookieName = "session";
const sessionMaxAgeSeconds = 7 * 24 * 60 * 60;

function normalizeRedirectUri(value: string | undefined) {
	if (!value || !value.startsWith("/") || value.startsWith("//")) {
		return "/admin";
	}

	return value;
}

const loginRedirect = createServerOnlyFn(async () => {
	const { getRequestHeader } = await import("@tanstack/react-start/server");
	const referer = getRequestHeader("referer");
	const redirectUri = referer
		? normalizeRedirectUri(new URL(referer).pathname + new URL(referer).search)
		: "/admin";

	return redirect({
		to: "/login",
		search: { redirectUri },
	});
});

export const readOwnerSessionFromCookie = createServerOnlyFn(async () => {
	const [{ getCookie }, { applicationContext }] = await Promise.all([
		import("@tanstack/react-start/server"),
		import("#/core/config/applicationContext"),
	]);
	const token = getCookie(sessionCookieName);

	if (!token) {
		return null;
	}

	return await applicationContext()
		.get("VerifyOwnerSessionUseCase")
		.verifyOwnerSession({ token });
});

export const ownerSessionMiddleware = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const session = await readOwnerSessionFromCookie();

	if (!session) {
		throw await loginRedirect();
	}

	return next({ context: { session } });
});

export const getOwnerSession = createServerFn({ method: "GET" }).handler(
	async () => await readOwnerSessionFromCookie(),
);

export const loginWithGoogle = createServerFn({ method: "POST" })
	.validator(
		z.object({
			credential: z.string().min(1),
		}),
	)
	.handler(async ({ data }) => {
		const [{ setCookie }, { applicationContext }] = await Promise.all([
			import("@tanstack/react-start/server"),
			import("#/core/config/applicationContext"),
		]);
		const session = await applicationContext()
			.get("VerifyGoogleOwnerUseCase")
			.verifyGoogleOwner({ credential: data.credential });

		if (!session) {
			throw new Error("허용된 Google 계정이 아닙니다.");
		}

		const token = await applicationContext()
			.get("SignOwnerSessionUseCase")
			.signOwnerSession(session);

		setCookie(sessionCookieName, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: sessionMaxAgeSeconds,
			expires: new Date(Date.now() + sessionMaxAgeSeconds * 1000),
		});

		return { isLoggedIn: true };
	});

export const logoutOwner = createServerFn({ method: "POST" }).handler(
	async () => {
		const { deleteCookie } = await import("@tanstack/react-start/server");
		deleteCookie(sessionCookieName, { path: "/" });
		return { isLoggedIn: false };
	},
);
