export const CoinList = (cur) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
    `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, cur) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${cur}&days=${days}`;

export const TrendingCoins = (cur) =>
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${cur}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;