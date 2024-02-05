<script lang='ts'>
    import {page} from '$app/stores';

    $: classesActive = (href: string) => (href === $page.url.pathname ? '!bg-primary-500' : '');
</script>

<nav class="list-nav p-4">
    <h3 class="p-2">Categories</h3>
    <hr />
    <ul class="p-2">
        <li>
            <a class="{classesActive("/")}" on:click href="/">
                <span class="flex-auto">Top Stocks</span>
            </a>
            <hr />
        </li>
        <li>
            <a class="{classesActive("/top-growth-stocks")}" on:click href="/top-growth-stocks">
                <span class="flex-auto">Top Growth Stocks</span>
            </a>
            <hr />
        </li>
        <li>
            <a class="{classesActive("/top-value-stocks")}" on:click href="/top-value-stocks">
                <span class="flex-auto">Top Value Stocks</span>
            </a>
            <hr />
        </li>
        <li>
            <a class="{classesActive("/top-technology-stocks")}" on:click href="/top-technology-stocks">
                <span class="flex-auto">Top Technology Stocks</span>
            </a>
            <hr />
        </li>
    </ul>
</nav>