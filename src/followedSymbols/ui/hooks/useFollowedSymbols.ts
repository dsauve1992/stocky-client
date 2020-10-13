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

            for (const ticker of data) {
                ticker.currentPrice = await getCurrentPrice(ticker.symbol)
            }

            setFollowedSymbols(data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    const follow = async (symbol: string, data: any) => {
        await new FollowedSymbolRepository().insert(symbol, data)
        setFollowedSymbols(prevState => [...prevState, data])
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

export default useFollowedSymbols
