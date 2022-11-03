/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { RenderToStreamOptions, renderToStream } from '@builder.io/qwik/server';

import Root from './root';
import { manifest } from '@qwik-client-manifest';

export default function (opts: RenderToStreamOptions) {
	return renderToStream(<Root />, {
		manifest,
		...opts,
		prefetchStrategy: {
			implementation: {
				linkInsert: null,
				workerFetchInsert: null,
				prefetchEvent: 'always',
			},
		},
	});
}
