
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