<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	export let data; 

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
		foot: ['Total', '', `<code class="code">${combinedStockData.length}</code>`]
	};
</script>

<Table className="overflow-x-auto" source={tableSimple} interactive={true} />

