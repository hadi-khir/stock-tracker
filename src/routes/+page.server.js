export async function load({ fetch }) {
    const res = await fetch('https://seekingalpha.com/api/v3/screener_results', {
			method: 'POST',
			body: JSON.stringify({
				filter: {
					quant_rating: {
						gte: 3.5,
						lte: 5,
						exclude: false
					},
					sell_side_rating: {
						gte: 3.5,
						lte: 5,
						exclude: false
					},
					value_category: {
						gte: 1,
						lte: 6,
						exclude: false
					},
					growth_category: {
						gte: 1,
						lte: 6,
						exclude: false
					},
					profitability_category: {
						gte: 1,
						lte: 6,
						exclude: false
					},
					momentum_category: {
						gte: 1,
						lte: 6,
						exclude: false
					},
					eps_revisions_category: {
						gte: 1,
						lte: 6,
						exclude: false
					},
					authors_rating: {
						gte: 3.5,
						lte: 5,
						exclude: false
					}
				},
				page: 1,
				per_page: 100,
				total_count: true,
				type: 'stock'
			}),
			headers: {
				"Content-Type": 'application/json',
				"Accept": 'application/json',
				"User-Agent": 'Mozilla/5.0'
			}
		});
		const data = await res.json();
		console.log(data);
    return {
        props: {
            data: data
        }
        
    };
}