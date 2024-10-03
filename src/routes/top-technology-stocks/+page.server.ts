import { extractMetricValue, fetchData, formatMarketCap, getGrade, gradeMap, ratingsMap } from "../../utils/utils";

const screenerReqBody = {
  filter: {
    quant_rating: { gte: 1, lte: 5, exclude: false },
    industry_id: {
      in: [
        45102010,
        45102030,
        45103010,
        45103020,
        45201020,
        45202030,
        45203010,
        45203015,
        45203020,
        45203030,
        45301010,
        45301020,
      ],
      exclude: false,
    },
  },
  page: 1,
  per_page: 100,
  total_count: true,
  type: "stock",
};

const getScreenerResults = () => {
  const url = "https://seekingalpha.com/api/v3/screener_results";
  return fetchData(url, "POST", screenerReqBody);
};

const getMetricsData = async (slugs: string) => {
  const url = `https://seekingalpha.com/api/v3/metrics?filter[fields]=quant_rating%2Cauthors_rating%2Csell_side_rating%2Cmarketcap_display%2Cdividend_yield&filter[slugs]=${slugs}&minified=false`;
  return fetchData(url, "GET");
};

const getTickerData = async (slugs: string) => {
  const url = `https://seekingalpha.com/api/v3/ticker_metric_grades?filter[fields]=value_category%2Cgrowth_category%2Cprofitability_category%2Cmomentum_category%2Ceps_revisions_category&filter[slugs]=${slugs}&filter[algos][]=etf&filter[algos][]=dividends&filter[algos][]=main_quant&filter[algos][]=reit&filter[algos][]=reit_dividend&minified=false`;
  return fetchData(url, "GET");
};

export async function load() {
  const screenerResults: ScreenerResultsData = await getScreenerResults();

  let slugs = "";
  screenerResults.data.forEach((stock: ScreenerResultsDataItem) => {
    slugs += stock.attributes.name + "%2C";
  });

  const metricsData: MetricsResultsData = await getMetricsData(slugs);

  const tickerGradeData: TickerGradeResultsData = await getTickerData(slugs);

  const combinedStockData: CombinedStockData[] = screenerResults.data.map((stock, idx) => {
    const stockId = stock.id;
    const companyName = stock.attributes.companyName;
    const ticker = stock.attributes.name;

    const marketCap = formatMarketCap(Number(extractMetricValue(metricsData, stockId, ratingsMap.get("marketCap")!)));
    const wallStreetRating = Math.round(Number(extractMetricValue(metricsData, stockId, ratingsMap.get("wallStreetRating")!)) * 100) / 100;
    const quantRating = Math.round(Number(extractMetricValue(metricsData, stockId, ratingsMap.get("quantRating")!)) * 100) / 100;
    const saAnalystRating = Math.round(Number(extractMetricValue(metricsData, stockId, ratingsMap.get("saAnalystRating")!)) * 100) / 100;

    const growth = getGrade(tickerGradeData, stockId, "growth", ratingsMap, gradeMap);
    const momentum = getGrade(tickerGradeData, stockId, "momentum", ratingsMap, gradeMap);
    const profitability = getGrade(tickerGradeData, stockId, "profitability", ratingsMap, gradeMap);
    const value = getGrade(tickerGradeData, stockId, "value", ratingsMap, gradeMap);
    const epsRevision = getGrade(tickerGradeData, stockId, "epsRevision", ratingsMap, gradeMap);

    return {
      rank: idx + 1,
      stockId: stockId,
      companyName: companyName,
      ticker: ticker,
      marketCap: marketCap,
      wallStreetRating: Math.round(Number(wallStreetRating) * 100) / 100,
      quantRating: Math.round(Number(quantRating) * 100) / 100,
      saAnalystRating: Math.round(Number(saAnalystRating) * 100) / 100,
      growth: growth,
      momentum: momentum,
      profitability: profitability,
      value: value,
      epsRevision: epsRevision,
    };
  }
  );

  return {
    props: {
      data: {
        combinedStockData: combinedStockData,
      },
    },
  };
}
