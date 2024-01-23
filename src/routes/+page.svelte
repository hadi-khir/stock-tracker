<script>
	import { onMount } from 'svelte';

	/**
	 * @type {any}
	 */
	export let data;
	console.log(data);
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
```
