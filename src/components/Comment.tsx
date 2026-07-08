import { useEffect, useRef } from "react";

const utterancesRepo = "myeongjae-kim/terrace-utterances";

type CommentProps = {
	identifier: string;
};

export default function Comment({ identifier }: CommentProps) {
	const containerRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;

		if (!container) {
			return;
		}

		container.replaceChildren();

		const utterances = document.createElement("script");
		utterances.src = "https://utteranc.es/client.js";
		utterances.setAttribute("repo", utterancesRepo);
		utterances.setAttribute("issue-term", "pathname");
		utterances.setAttribute("theme", "github-light");
		utterances.setAttribute("crossorigin", "anonymous");
		utterances.async = true;

		container.appendChild(utterances);

		return () => {
			container.replaceChildren();
		};
	}, [identifier]);

	return (
		<section
			id="comment-container"
			ref={containerRef}
			aria-label="Comments"
			className="mx-auto w-full"
			data-comment-identifier={identifier}
		/>
	);
}
