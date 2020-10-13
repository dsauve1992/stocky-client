import React, {useEffect} from "react";
import groupBy from 'lodash/groupBy';
import useFetchFutures from "../../hooks/useFetchFuture";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import FutureDataTable from "../FuturesDataTable/FutureDataTable";
import {Grid} from "@material-ui/core";

const Futures: React.FunctionComponent = () => {
    const {futures, loading, error, fetchFutures} = useFetchFutures();

    useEffect(() => {
        fetchFutures()
    }, [fetchFutures])


    if (loading || futures === null) {
        return <CircularProgress/>
    }

    if (error) {
        return <Alert severity="error">{error.message}</Alert>
    }

    const {BUY, SELL} = groupBy(futures, (entry) => entry.signal)

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
                <FutureDataTable name={"Future Buys"} data={BUY}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FutureDataTable name={"Future Sells"} data={SELL}/>
            </Grid>
        </Grid>
        )





}

export default Futures;
