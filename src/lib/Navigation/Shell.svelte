<script lang='ts'>
	import { AppBar } from "@skeletonlabs/skeleton";
    import GitHubIcon from '$lib/assets/github-mark.png';
</script>

<AppBar>
    <svelte:fragment slot="lead">
        <div class="flex items-center">
            <button class="btn btn-sm mr-4 lg:hidden" on:click>
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