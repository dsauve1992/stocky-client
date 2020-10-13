import {useCallback, useState} from "react";
import StorageBucket from "../../../global/infra/StorageBucket/StorageBucket";
import FutureModel from "../../domain/model";

const useFetchFuture = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [futures, setFutures] = useState<FutureModel[] | null>(null);

    const fetchFutures = useCallback(async () => {
        try {
            setLoading(true);
            const data = await StorageBucket.downloadByReference('future.json')
            setFutures(data);
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        futures,
        loading,
        error,
        fetchFutures
    }
}

export default useFetchFuture;
