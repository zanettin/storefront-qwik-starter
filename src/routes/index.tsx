import { component$, useContext } from '@builder.io/qwik';

import { APP_STATE } from '~/constants';
import CollectionCard from '~/components/collection-card/CollectionCard';

export const headerImage =
	'https://readonlydemo.vendure.io/assets/preview/2f/mikkel-bech-748940-unsplash__preview.jpg';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	return (
		<>
			<div className="relative">
				<div className="absolute inset-0 overflow-hidden">
					{headerImage && (
						<img
							className="h-full object-cover md:w-full"
							src={headerImage + '?w=800'}
							alt="header"
							width="800"
						/>
					)}
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
				</div>
				<div className="absolute inset-0 bg-gray-900 opacity-50" />
				<div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
					<div className="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
						<h1 className="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
							Vendure Qwik Starter
						</h1>
					</div>

					<p className="mt-4 text-2xl text-white">
						A headless commerce storefront starter kit built with{' '}
						<a
							href="https://www.vendure.io"
							target="_blank"
							className="text-blue-300 hover:text-blue-500"
						>
							Vendure
						</a>{' '}
						&{' '}
						<a
							href="https://qwik.builder.io/"
							target="_blank"
							className="text-[#4092ff] hover:text-red-500"
						>
							Qwik
						</a>
					</p>
				</div>
			</div>

			<section className="pt-12 sm:pt-16 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div className="py-8 sm:py-6 lg:py-8 bg-slate-200 text-center">
					<div id="apn-ad-slot-wb1" data-slot="WB_1" className="ad-slot"></div>
				</div>

				<div className="mt-12 px-4 sm:px-6 lg:px-8 xl:px-0">
					<h2 className="text-2xl font-light tracking-tight text-gray-900">Shop by Category</h2>
				</div>

				<div className="mt-4 flow-root">
					<div className="-my-2">
						<div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								{collections.map((collection) =>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : null
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-12 py-8 sm:py-6 lg:py-8 bg-slate-200 text-center">
					<div id="apn-ad-slot-wb2" data-slot="WB_1" className="ad-slot"></div>
				</div>
			</section>
		</>
	);
});
