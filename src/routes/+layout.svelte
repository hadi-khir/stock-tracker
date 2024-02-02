<script lang='ts'>
	import { AppShell, initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import Shell from '$lib/Navigation/Shell.svelte';

	initializeStores();
	const drawerStore = getDrawerStore();

	function drawerOpen(): void {
		drawerStore.open({});
	}

	function drawerClose(): void {
		drawerStore.close();
	}
</script>

<Drawer class="w-64 !bg-transparent">
	<Navigation on:click={drawerClose} />
</Drawer>
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<Shell on:click={drawerOpen} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
