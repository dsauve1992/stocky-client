export default interface FutureModel{
    "symbol": string,
    "signal": "SELL" | "BUY",
    "current_price": number | null,
    "industry": string | null
}
