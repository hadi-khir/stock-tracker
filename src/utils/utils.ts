export const fetchData = async (url: string, method: string, body?: any) => {
    const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    };

    const response = await fetch(url, {
        method: method,
        headers: headers,
        body: body ? JSON.stringify(body) : null,
    });

    return response.json();
};

export const extractMetricValue = (metricsData: MetricsResultsData, stockId: string, metricKey: string) => {
    return metricsData.data.find((metric) => metric.id === `[${stockId}, ${metricKey}]`)?.attributes?.value || "N/A";
};

export const formatMarketCap = (marketCap: number | undefined) => {
    if (!marketCap || isNaN(marketCap)) return "N/A";
    return marketCap > 999999999
        ? (marketCap / 1000000000).toFixed(2) + "B"
        : (marketCap / 1000000).toFixed(2) + "M";
};

export const ratingsMap = new Map([
    ["marketCap", "7935"],
    ["wallStreetRating", "230572"],
    ["quantRating", "262081"],
    ["saAnalystRating", "642075"],
    ["growth", "262082"],
    ["momentum", "262084"],
    ["profitability", "262083"],
    ["value", "262085"],
    ["epsRevision", "262086"],
]);

export const gradeMap = new Map([
    [1, "A+"],
    [2, "A"],
    [3, "A-"],
    [4, "B+"],
    [5, "B"],
    [6, "B-"],
    [7, "C+"],
    [8, "C"],
    [9, "C-"],
    [10, "D+"],
    [11, "D"],
    [12, "D-"],
    [13, "F"],
]);

export const getGrade = (tickerGradeData: TickerGradeResultsData, stockId: string, ratingKey: string, ratingsMap: Map<string, string>, gradeMap: Map<number, string>) => {
    const metric = tickerGradeData.data.find(
        (metric) => metric.id === `${stockId},${ratingsMap.get(ratingKey)},main_quant`
    );

    // Check if the grade exists and is a number
    const grade = metric?.attributes?.grade;
    return typeof grade === "number" ? gradeMap.get(grade) || "N/A" : "N/A";
};
