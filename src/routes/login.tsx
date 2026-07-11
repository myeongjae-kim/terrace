import { clientEnv } from "#/config/clientEnv";
import { loginWithGoogle } from "#/features/owner-auth/serverFns";
import { siteMetadata } from "#/features/site/siteMetadata";
import { Button } from "@astryxdesign/core/Button";
import { Heading } from "@astryxdesign/core/Heading";
import { Section } from "@astryxdesign/core/Section";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	GoogleLogin,
	GoogleOAuthProvider,
	type CredentialResponse,
} from "@react-oauth/google";
import { useState } from "react";

function normalizeRedirectUri(value: unknown) {
	if (
		typeof value !== "string" ||
		!value.startsWith("/") ||
		value.startsWith("//")
	) {
		return "/admin";
	}

	return value;
}

export const Route = createFileRoute("/login")({
	head: () => ({
		meta: [
			{ title: siteMetadata.createTitle("Login") },
			{ name: "description", content: "관리자 로그인" },
		],
	}),
	validateSearch: (search) => ({
		redirectUri: normalizeRedirectUri(search.redirectUri),
	}),
	component: LoginPage,
});

function LoginPage() {
	const { redirectUri } = Route.useSearch();

	return (
		<GoogleOAuthProvider clientId={clientEnv.VITE_GOOGLE_LOGIN_CLIENT_ID}>
			<LoginPanel redirectUri={redirectUri} />
		</GoogleOAuthProvider>
	);
}

function LoginPanel({ redirectUri }: { redirectUri: string }) {
	const navigate = useNavigate();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function handleSuccess(response: CredentialResponse) {
		setErrorMessage(null);

		if (!response.credential) {
			setErrorMessage("Google credential을 받을 수 없습니다.");
			return;
		}

		try {
			setIsLoading(true);
			await loginWithGoogle({ data: { credential: response.credential } });
			await navigate({ to: redirectUri });
		} catch (error) {
			setErrorMessage(
				error instanceof Error ? error.message : "로그인에 실패했습니다.",
			);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<VStack
			as="main"
			className="min-h-[65vh] w-full bg-white"
			hAlign="center"
			vAlign="center"
		>
			<Section variant="transparent" padding={4}>
				<VStack className="w-full max-w-sm" hAlign="center" gap={4}>
					<VStack hAlign="center" gap={1}>
						<Heading level={1} className="text-center text-2xl">
							Admin login
						</Heading>
						<Text className="text-center text-sm text-gray-500">
							허용된 Google 계정으로만 접근할 수 있습니다.
						</Text>
					</VStack>
					<GoogleLogin
						auto_select
						shape="pill"
						useOneTap
						onSuccess={handleSuccess}
						onError={() => setErrorMessage("Google 로그인에 실패했습니다.")}
					/>
					{isLoading && (
						<Text className="text-sm text-gray-500">확인 중...</Text>
					)}
					{errorMessage && (
						<Text className="text-sm text-red-600">{errorMessage}</Text>
					)}
					<Button
						label="Back to site"
						variant="ghost"
						size="sm"
						onClick={() => void navigate({ to: "/" })}
					/>
				</VStack>
			</Section>
		</VStack>
	);
}
