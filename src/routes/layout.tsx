import { ActiveOrder, AppState, Collection } from '~/types';
import {
	Slot,
	component$,
	useClientEffect$,
	useContextProvider,
	useServerMount$,
	useStore,
} from '@builder.io/qwik';
import { getActiveOrderQuery, getCollectionsQuery } from '~/graphql/queries';

import { APP_STATE } from '~/constants';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { execute } from '~/utils/api';

export default component$(() => {
	const state = useStore<AppState>({
		collections: [],
		activeOrder: {} as ActiveOrder,
		showCart: false,
	});
	useContextProvider(APP_STATE, state);

	useServerMount$(async () => {
		const { collections } = await execute<{
			collections: { items: Collection[] };
		}>(getCollectionsQuery());
		state.collections = collections.items;
	});

	useClientEffect$(async () => {
		const { activeOrder } = await execute<{ activeOrder: ActiveOrder }>(getActiveOrderQuery());
		state.activeOrder = activeOrder;
	});

	return (
		<div>
			<Header />
			<main>
				<Slot />
			</main>
			<Footer />
		</div>
	);
});
