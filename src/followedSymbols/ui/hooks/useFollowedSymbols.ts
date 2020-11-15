import {useCallback, useState} from "react";
import FollowedSymbolRepository from "../../../future/infra/FollowedSymbolRepository";
import getCurrentPrice from "../../../stockPrices/stockPrices";

const useFollowedSymbols = () => {
    const [followedSymbols, setFollowedSymbols] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    const fetch = async () => {
        try {
            setLoading(true)
            const data = await new FollowedSymbolRepository().getAll();
            await _addCurrentPriceOnTicker(data);

            setFollowedSymbols(data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const follow = async (symbol: string, data: any) => {
        await new FollowedSymbolRepository().insert(symbol, {
            industry : data.industry,
            followSince : new Date().valueOf(),
            priceOnSignal : data.current_price
        })
        setFollowedSymbols(prevState => [...prevState, {...data, priceOnSignal : data.current_price}])
    }

    const unfollow = async (symbol: string) => {
        await new FollowedSymbolRepository().delete(symbol)
        setFollowedSymbols(prevState => prevState.filter((_symbol) => _symbol.symbol !== symbol))

    }

    const isFollowedSymbols = (symbol: string) => {
        return followedSymbols.find((_symbol) => _symbol.symbol === symbol)
    }

    return {
        selectors: {
            followedSymbols,
            loading,
            error
        },
        actions: {
            fetch: useCallback(fetch, []),
            follow: useCallback(follow, []),
            unfollow: useCallback(unfollow, []),
            isFollowedSymbols: useCallback(isFollowedSymbols, [followedSymbols])
        }
    }
}

const _addCurrentPriceOnTicker = async (data: any[]) => {
    for (const ticker of data) {
        const {data: {price}} = await getCurrentPrice(ticker.symbol)
        ticker.currentPrice = price;
        ticker.diff = ((ticker.currentPrice - ticker.priceOnSignal) / ticker.priceOnSignal) * 100;
    }

    return data;
}

export default useFollowedSymbols
