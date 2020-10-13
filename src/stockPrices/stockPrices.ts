const yahooStockAPI = require('yahoo-stock-api');

const getCurrentPrice = async (symbol: string) => {
    try {
        return yahooStockAPI.getSymbol(symbol)
    } catch (e) {
        return 0;
    }
}

export default getCurrentPrice
