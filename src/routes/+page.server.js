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
        "User-Agent": "Mozilla/5.0",
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
        "User-Agent": "Mozilla/5.0",
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

  return {
    props: {
      data: {
		screener: screenerResultsData,
		metrics: metricsData,
		tickerGrade: tickerGradeData
	  },
    },
  };
}
