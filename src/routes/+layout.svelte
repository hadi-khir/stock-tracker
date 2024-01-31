<script>
	import { AppBar, AppShell } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import Navigation from '$lib/Navigation/Navigation.svelte';
	import GitHubIcon from '$lib/assets/github-mark.png';
</script>

<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="btn btn-sm mr-4 lg:hidden">
						<span>
							<svg viewBox="0 0 100 80" class="fill-token h-4 w-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					<strong class="text-xl uppercase">Stock Tracker</strong>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a target="_blank" rel="noopener noreferrer" href="https://github.com/hadi-khir/stock-tracker">
					<img class="w-8" src={GitHubIcon} alt='GitHub Icon'/>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<slot />
</AppShell>
