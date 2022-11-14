import { useDocumentHead, useLocation } from '@builder.io/qwik-city';

import { Analytics } from './analytics';
import { Social } from './social';
import { component$ } from '@builder.io/qwik';

export const Head = component$(() => {
	const head = useDocumentHead();
	const loc = useLocation();

	return (
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<title>Vendure Qwik Storefront</title>

			<link rel="canonical" href={loc.href} />

			{head.meta.map((m) => (
				<meta {...m} />
			))}

			{head.links.map((l) => (
				<link {...l} />
			))}

			{head.styles.map((s) => (
				<style {...s.props} dangerouslySetInnerHTML={s.style} />
			))}

			<Social />
			<Analytics loc={loc} />

			{/* <!-- OneTrust CMP Builder start --> */}
			<script
				src="https://cmp-cdn.cookielaw.org/scripttemplates/otSDKStub.js"
				type="text/javascript"
				data-cmp-builder-version="2.0.0"
				data-domain-script="center-center-dark-global"
			></script>
		</head>
	);
});
