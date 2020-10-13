import React, {useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {Grid, Paper} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useFollowedSymbols from "../hooks/useFollowedSymbols";

const FollowedSymbols: React.FunctionComponent = () => {
    const {
        selectors : {followedSymbols, loading, error},
        actions : {fetch}
    } = useFollowedSymbols();

    useEffect(() => {
        fetch()
    }, [fetch])


    if (loading || followedSymbols === null) {
        return <CircularProgress/>
    }

    if (error) {
        return <Alert severity="error">{error.message}</Alert>
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <MUIDataTable title={'Following Tickers'} data={followedSymbols} columns={['symbol']}/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FollowedSymbols;
