const screenerReqBody = {
  filter: {
    quant_rating: {
      gte: 3.5,
      lte: 5,
      exclude: false,
    },
    sell_side_rating: {
      gte: 3.5,
      lte: 5,
      exclude: false,
    },
    value_category: {
      gte: 1,
      lte: 6,
      exclude: false,
    },
    growth_category: {
      gte: 1,
      lte: 6,
      exclude: false,
    },
    profitability_category: {
      gte: 1,
      lte: 6,
      exclude: false,
    },
    momentum_category: {
      gte: 1,
      lte: 6,
      exclude: false,
    },
    eps_revisions_category: {
      gte: 1,
      lte: 6,
      exclude: false,
    },
    authors_rating: {
      gte: 3.5,
      lte: 5,
      exclude: false,
    },
  },
  page: 1,
  per_page: 100,
  total_count: true,
  type: "stock",
};

export async function load({ fetch }) {
  const screenerResultsReq = await fetch(
    "https://seekingalpha.com/api/v3/screener_results",
    {
      method: "POST",
      body: JSON.stringify(screenerReqBody),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
    }
  );
  const screenerResultsData = await screenerResultsReq.json();

  const metricsReq = await fetch(
    "https://seekingalpha.com/api/v3/metrics?filter[fields]=quant_rating%2Cauthors_rating%2Csell_side_rating%2Cmarketcap_display%2Cdividend_yield&filter[slugs]=gct%2Csurg%2Cstne%2Cbway%2Cambc%2Carch%2Ctpg%2Ctkc%2Ccls%2Cgbooy%2Crcmt%2Cimbby%2Czyme%2Ctnk%2Ctrmd%2Cjbi%2Cfro%2Cwnc%2Cspok%2Chdely%2Ckrc%2Clmb%2Cblbd%2Cgsl%2Cdhi%2Cprdo%2Casc%2Cpags%2Csilv%2Cstrl%2Ceprt%2Carct%2Caeg%2Cinsw%2Ckof%2Clbrt%2Cryaay%2Cbnl%2Cparr%2Cheps%2Cslvm%2Cmltx&minified=false",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
      },
    }
  );
  const metricsData = await metricsReq.json();

  const tickerGradeReq = await fetch(
    "https://seekingalpha.com/api/v3/ticker_metric_grades?filter[fields]=value_category%2Cgrowth_category%2Cprofitability_category%2Cmomentum_category%2Ceps_revisions_category&filter[slugs]=gct%2Csurg%2Cstne%2Cbway%2Cambc%2Carch%2Ctpg%2Ctkc%2Ccls%2Cgbooy%2Crcmt%2Cimbby%2Czyme%2Ctnk%2Ctrmd%2Cjbi%2Cfro%2Cwnc%2Cspok%2Chdely%2Ckrc%2Clmb%2Cblbd%2Cgsl%2Cdhi%2Cprdo%2Casc%2Cpags%2Csilv%2Cstrl%2Ceprt%2Carct%2Caeg%2Cinsw%2Ckof%2Clbrt%2Cryaay%2Cbnl%2Cparr%2Cheps%2Cslvm%2Cmltx&filter[algos][]=etf&filter[algos][]=dividends&filter[algos][]=main_quant&filter[algos][]=reit&filter[algos][]=reit_dividend&minified=false",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    }
  );
  const tickerGradeData = await tickerGradeReq.json();

// 7935 = market cap 
// 230572 = wall street rating
// 262081 = quant rating
// 642075 = SA Analyst rating

// 262082 = growth
// 262084 = momentum
// 262083 = profitability
// 262085 = value
// 262086 = eps revision

	const ratingsMap = new Map();
	ratingsMap.set('marketCap', '7935');
	ratingsMap.set('wallStreetRating', '230572');
	ratingsMap.set('quantRating', '262081');
	ratingsMap.set('saAnalystRating', '642075');
	ratingsMap.set('growth', '262082');
	ratingsMap.set('momentum', '262084');
	ratingsMap.set('profitability', '262083');
	ratingsMap.set('value', '262085');
	ratingsMap.set('epsRevision', '262086');

	const gradeMap = new Map();
	gradeMap.set(1, 'A+');
	gradeMap.set(2, 'A');
	gradeMap.set(3, 'A-');
	gradeMap.set(4, 'B+');
	gradeMap.set(5, 'B');
	gradeMap.set(6, 'B-');


	const combinedStockData = screenerResultsData.data.map((/** @type {any} */ stock, /** @type {number} */ idx) => {
		
		const stockId = stock.id;
		const companyName = stock.attributes.companyName;
		const ticker = stock.attributes.name;
		//const stockData = getStockData(ticker);

		//get market cap
		const marketCap = metricsData.data.find((/** @type {any} */ metric) => {
			return metric.id === `[${stockId}, ${ratingsMap.get('marketCap')}]`;
		})?.attributes?.value;

		// convert it to string and append 'B'
		let marketCapInBillionsString = parseFloat(marketCap) > 999999999 ? ((Number(marketCap) / 1000000000).toFixed(2)).toString() + 'B' : ((Number(marketCap) / 10000000).toFixed(2)).toString() + 'M';
    if (marketCap === undefined || isNaN(marketCap)) {
      marketCapInBillionsString = 'N/A';
    }

		// get wall street rating
		const wallStreetRating = metricsData.data.find((/** @type {any} */ metric) => {
			return metric.id === `[${stockId}, ${ratingsMap.get('wallStreetRating')}]`;
		})?.attributes?.value;

		// get quant rating
		let quantRating = metricsData.data.find((/** @type {any} */ metric) => {
			return metric.id === `[${stockId}, ${ratingsMap.get('quantRating')}]`;
		})?.attributes?.value;

		// get SA Analyst rating
		const saAnalystRating = metricsData.data.find((/** @type {any} */ metric) => {
			return metric.id === `[${stockId}, ${ratingsMap.get('saAnalystRating')}]`;
		})?.attributes?.value;

		// get growth
		const growth = gradeMap.get(tickerGradeData.data.find((/** @type {any} */ metric) => {
			return metric.id === `${stockId},${ratingsMap.get('growth')},main_quant`;
		})?.attributes?.grade);

		// get momentum
		const momentum = gradeMap.get(tickerGradeData.data.find((/** @type {any} */ metric) => {
			return metric.id === `${stockId},${ratingsMap.get('momentum')},main_quant`;
		})?.attributes?.grade);

		// get profitability
		const profitability = gradeMap.get(tickerGradeData.data.find((/** @type {any} */ metric) => {
			return metric.id === `${stockId},${ratingsMap.get('profitability')},main_quant`;
		})?.attributes?.grade);

		// get value
		const value = gradeMap.get(tickerGradeData.data.find((/** @type {any} */ metric) => {
			return metric.id === `${stockId},${ratingsMap.get('value')},main_quant`;
		})?.attributes?.grade);

		// get eps revision
		const epsRevision = gradeMap.get(tickerGradeData.data.find((/** @type {any} */ metric) => {
			return metric.id === `${stockId},${ratingsMap.get('epsRevision')},main_quant`;
		})?.attributes?.grade);

		// append stock data to return 
		return {
      rank: idx + 1,
			stockId: stockId,
			companyName: companyName,
			ticker: ticker,
			marketCap: marketCapInBillionsString,
			wallStreetRating: Math.round(Number(wallStreetRating) * 100) / 100,
			quantRating: Math.round(Number(quantRating) * 100) / 100,
			saAnalystRating: Math.round(Number(saAnalystRating) * 100) / 100,
			growth: growth,
			momentum: momentum,
			profitability: profitability,
			value: value,
			epsRevision: epsRevision,
			//stockData: stockData
		}

	});

  return {
    props: {
      data: {
		combinedStockData: combinedStockData
	  },
    },
  };
}

// const getStockData = async (/** @type {any} */ ticker) => {

// 	// add a 3 second delay
// 	await new Promise(resolve => setTimeout(resolve, 3000));
// 	const date = "2024-01-25";
// 	const url = `https://seekingalpha.com/api/v3/historical_prices?filter[ticker][slug]=${ticker}&filter[for_date]=${date}&sort=as_of_date`;
// 	const stockReq = await fetch(
// 	url,
// 	{
// 	  method: "GET",
// 	  headers: {
// 		"Content-Type": "application/json",
// 		"Accept": "application/json",
// 		"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
// 	  },
// 	}
//   );
//   const stockData = await stockReq.json();

//   return stockData;
// }
