<script>
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import Icon from '$lib/assets/dijla_cafe.png';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"><img class="max-w-8" src={Icon} alt="dijla cafe" /></svelte:fragment>

	<a
		href="/"
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>Top Stocks</a
	>
	<a
		href="/"
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>Top Growth Stocks</a
	>
	<a
		href="/"
		class="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
		Top Value Stocks
	</a>

	<svelte:fragment slot="trail">(actions)</svelte:fragment>
</AppBar>

<slot />
