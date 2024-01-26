<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	/**
	 * @type {any}
	 */
	export let data: any;

	let tableSimple: TableSource;

	const combinedStockData = data.props.data.combinedStockData;
	tableSimple = {
		// A list of heading labels.
		head: [
			'Rank',
			'Company Name',
			'Ticker',
			'Market Cap',
			'Wall Street Rating',
			'Quant Rating',
			'SA Analyst Rating',
			'Growth',
			'Momentum',
			'Profitability',
			'Value',
			'EPS Revision'
		],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(combinedStockData, [
			'rank',
			'companyName',
			'ticker',
			'marketCap',
			'wallStreetRating',
			'quantRating',
			'saAnalystRating',
			'growth',
			'momentum',
			'profitability',
			'value',
			'epsRevision'
		]),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		//meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${combinedStockData.length + 1}</code>`]
	};
</script>

<Table source={tableSimple} interactive={true} />

