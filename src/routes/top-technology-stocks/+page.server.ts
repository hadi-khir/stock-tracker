interface ScreenerResultsData {
  data: ScreenerResultsDataItem[];
  meta: ScreenerResultsDataMeta;
}

interface ScreenerResultsDataItem {
  id: string;
  type: string;
  attributes: ScreenerResultsDataItemAttributes;
  meta?: ScreenerResultsDataItemMeta;
}

interface ScreenerResultsDataItemMeta {
  companyLogoUrl: string;
  companyLogoUrlLight: string;
  companyLogoUrlDark: string;
}

interface ScreenerResultsDataItemAttributes {
  slug: string;
  name: string;
  company: string;
  companyName: string;
}

interface ScreenerResultsDataMeta {
  count: number;
}

interface MetricsResultsData {
  data: MetricsResultsDataItem[];
}

interface MetricsResultsDataItem {
  id: string;
  type: string;
  attributes: MetricsResultsDataItemAttributes;
}

interface MetricsResultsDataItemAttributes {
  value: number;
  meaningful: boolean;
}

interface TickerGradeResultsData {
  data: TickerGradeResultsDataItem[];
}

interface TickerGradeResultsDataItem {
  id: string;
  type: string;
  attributes: TickerGradeResultsDataItemAttributes;
}

interface TickerGradeResultsDataItemAttributes {
  grade: number;
  algo: string;
}

interface CombinedStockData {
  rank: number;
  stockId: string;
  companyName: string;
  ticker: string;
  marketCap: string;
  wallStreetRating: number;
  quantRating: number;
  saAnalystRating: number;
  growth: string;
  momentum: string;
  profitability: string;
  value: string;
  epsRevision: string;
}

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

const getScreenerResults = async () => {
  const url = "https://seekingalpha.com/api/v3/screener_results";
  const reqType = "POST";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  };
  const response = await fetch(url, {
    method: reqType,
    body: JSON.stringify(screenerReqBody),
    headers: headers,
  });

  return response.json();
};

const getMetricsData = async (slugs: string) => {
  const url = `https://seekingalpha.com/api/v3/metrics?filter[fields]=quant_rating%2Cauthors_rating%2Csell_side_rating%2Cmarketcap_display%2Cdividend_yield&filter[slugs]=${slugs}&minified=false`;
  const reqType = "GET";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  };

  const response = await fetch(url, {
    method: reqType,
    headers: headers,
  });

  return response.json();
};

const getTickerData = async (slugs: string) => {
  const url = `https://seekingalpha.com/api/v3/ticker_metric_grades?filter[fields]=value_category%2Cgrowth_category%2Cprofitability_category%2Cmomentum_category%2Ceps_revisions_category&filter[slugs]=${slugs}&filter[algos][]=etf&filter[algos][]=dividends&filter[algos][]=main_quant&filter[algos][]=reit&filter[algos][]=reit_dividend&minified=false`;
  const reqType = "GET";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
  };

  const response = await fetch(url, {
    method: reqType,
    headers: headers,
  });

  return response.json();
};

export async function load() {
  const screenerResults: ScreenerResultsData = await getScreenerResults();

  let slugs = "";
  screenerResults.data.forEach((stock: ScreenerResultsDataItem) => {
    slugs += stock.attributes.name + "%2C";
  });

  const metricsData: MetricsResultsData = await getMetricsData(slugs);

  const tickerGradeData: TickerGradeResultsData = await getTickerData(slugs);

  const ratingsMap = new Map();
  ratingsMap.set("marketCap", "7935");
  ratingsMap.set("wallStreetRating", "230572");
  ratingsMap.set("quantRating", "262081");
  ratingsMap.set("saAnalystRating", "642075");
  ratingsMap.set("growth", "262082");
  ratingsMap.set("momentum", "262084");
  ratingsMap.set("profitability", "262083");
  ratingsMap.set("value", "262085");
  ratingsMap.set("epsRevision", "262086");

  const gradeMap = new Map();
  gradeMap.set(1, "A+");
  gradeMap.set(2, "A");
  gradeMap.set(3, "A-");
  gradeMap.set(4, "B+");
  gradeMap.set(5, "B");
  gradeMap.set(6, "B-");
  gradeMap.set(7, "C+");
  gradeMap.set(8, "C");
  gradeMap.set(9, "C-");
  gradeMap.set(10, "D+");
  gradeMap.set(11, "D");
  gradeMap.set(12, "D-");
  gradeMap.set(13, "F");

  const combinedStockData: CombinedStockData[] = screenerResults.data.map(
    (stock: ScreenerResultsDataItem, idx: number) => {
      const stockId = stock.id;
      const companyName = stock.attributes.companyName;
      const ticker = stock.attributes.name;

      const marketCap = metricsData.data.find((/** @type {any} */ metric) => {
        return metric.id === `[${stockId}, ${ratingsMap.get("marketCap")}]`;
      })?.attributes?.value;

      let marketCapInBillionsString: string;
      if (marketCap === undefined || isNaN(marketCap)) {
        marketCapInBillionsString = "N/A";
      } else {
        marketCapInBillionsString =
          marketCap > 999999999
            ? (Number(marketCap) / 1000000000).toFixed(2).toString() + "B"
            : (Number(marketCap) / 1000000).toFixed(2).toString() + "M";
      }

      const wallStreetRating: number | undefined = metricsData.data.find(
        (metric) => {
          return (
            metric.id === `[${stockId}, ${ratingsMap.get("wallStreetRating")}]`
          );
        }
      )?.attributes?.value;

      const quantRating: number | undefined = metricsData.data.find(
        (metric) => {
          return metric.id === `[${stockId}, ${ratingsMap.get("quantRating")}]`;
        }
      )?.attributes?.value;

      const saAnalystRating: number | undefined = metricsData.data.find(
        (metric) => {
          return (
            metric.id === `[${stockId}, ${ratingsMap.get("saAnalystRating")}]`
          );
        }
      )?.attributes?.value;

      const growth: string = gradeMap.get(
        tickerGradeData.data.find((metric) => {
          return (
            metric.id === `${stockId},${ratingsMap.get("growth")},main_quant`
          );
        })?.attributes?.grade
      );

      const momentum: string = gradeMap.get(
        tickerGradeData.data.find((metric) => {
          return (
            metric.id === `${stockId},${ratingsMap.get("momentum")},main_quant`
          );
        })?.attributes?.grade
      );

      const profitability: string = gradeMap.get(
        tickerGradeData.data.find((metric) => {
          return (
            metric.id ===
            `${stockId},${ratingsMap.get("profitability")},main_quant`
          );
        })?.attributes?.grade
      );

      const value: string = gradeMap.get(
        tickerGradeData.data.find((metric) => {
          return (
            metric.id === `${stockId},${ratingsMap.get("value")},main_quant`
          );
        })?.attributes?.grade
      );

      const epsRevision: string = gradeMap.get(
        tickerGradeData.data.find((metric) => {
          return (
            metric.id ===
            `${stockId},${ratingsMap.get("epsRevision")},main_quant`
          );
        })?.attributes?.grade
      );

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
