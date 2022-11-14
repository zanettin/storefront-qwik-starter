import './global.css';

import { $, component$, useClientEffect$ } from '@builder.io/qwik';
import { QwikCity, RouterOutlet } from '@builder.io/qwik-city';

import { Head } from './components/head/head';

// TEMP CMP HANDLING
export const addCmpBuilderFeatures = $(() => {
	console.log('🚧 Init CMP');
	const existingCmpFeaturesScript = document.getElementById('cmp-builder-features-script');
	if (!existingCmpFeaturesScript) {
		const cmpFeaturesScript = document.createElement('script'),
			script1 = document.getElementsByTagName('script')[0];
		cmpFeaturesScript.src = 'https://cmp-cdn.cookielaw.org/consent/cmp-features/cmp-features.js';
		cmpFeaturesScript.setAttribute('id', 'cmp-builder-features-script');
		cmpFeaturesScript.async = false;
		cmpFeaturesScript.type = 'text/javascript';
		// @ts-ignore
		script1.parentNode.insertBefore(cmpFeaturesScript, script1);
	}
});

// TEMP AD HANDLING
export const addAdHandler = $(() => {
	console.log('🤠 Init Ads');

	// Initiate Admeira Tag Manager framework. Each website / SPA will get a unique <publisher> identifier.
	(function (a, d, m, e, i) {
		a.admTagMan = a.admTagMan || {};
		a.admTagMan.q = a.admTagMan.q || [];
		a.admTagMan.cq = a.admTagMan.cq || [];
		a.admTagMan.publisher = d;
		a.admTagMan.lang = m;
		a.admTagMan.version = e;
		a.admTagMan.env = i;

		const el = a.document.createElement('script');
		el.src = '//cdn.admeira.ch/prod/tagmanager/loader.min.js';
		a.document.head.appendChild(el);
	})(window, 'showroom.ch', 'de', 'latest');

	// Push commands to loading queue, ads will be loaded asynchronously.
	window.admTagMan.q.push(function () {
		window.admTagMan.init({
			platform: 'Desktop',
			channel: 'ROS',
			targeting: {
				pagetype: 'overview',
				// admforce: 'qa-big', // show demo ads
				admforce: 'qa', // show demo ads
			},
		});
	});

	const slots: any = [];
	document.querySelectorAll('.ad-slot').forEach((slot) => {
		const slotId = slot.getAttribute('id');
		const slotName = slot.getAttribute('data-slot');
		if (slotId && slotName) {
			slots.push({
				id: slotId,
				slot: slotName,
			});
		}
	});

	// Define ad tags
	window.admTagMan.q.push(function () {
		if (!slots.length) {
			console.log('🤠 No ads to load');
			return;
		}

		console.log(`🤠 Loading ${slots.length} ads`);

		slots.map((slot: any) => {
			window.admTagMan.registerSlot({
				slot: slot.slot,
				container: slot.id,
			});
		});

		window.admTagMan.loadSlots();
	});
});

export default component$(() => {
	useClientEffect$(() => {
		addCmpBuilderFeatures();
		addAdHandler();
	});
	return (
		<QwikCity>
			<Head />
			<body lang="en">
				<RouterOutlet />
			</body>
		</QwikCity>
	);
});
