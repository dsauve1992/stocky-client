import React, {Fragment, useEffect} from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import {Chip, Grid, Link, Paper} from "@material-ui/core";
import MUIDataTable, {MUIDataTableColumn, MUIDataTableOptions} from "mui-datatables";
import useFollowedSymbols from "../hooks/useFollowedSymbols";

const FollowedSymbols: React.FunctionComponent = () => {
    const {
        selectors : {followedSymbols, loading, error},
        actions : {fetch, unfollow}
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

    const columns: MUIDataTableColumn[] = [
        {
            name: 'symbol', label: 'Symbol',
            options: {
                filterType: 'textField',
                customBodyRender: (value) => {
                    return(<Fragment>
                        <Link href={`https://ca.finance.yahoo.com/chart/${value}`}>{value}</Link>
                    </Fragment>)
                }
            }
        },
        {
            name: 'priceOnSignal', label: 'Price On Signal',
        },
        {name: 'currentPrice', label: 'Current Price'},
        {
            name: 'diff',
            label: 'Evolution',
            options: {
                customBodyRender: (value) => {
                    return (<Chip color={parseFloat(value) > 0 ? 'primary' : 'secondary'}
                                  label={parseFloat(value).toFixed(2)}/>)
                }
            }
        }
    ];

    const options : MUIDataTableOptions = {
        onRowsDelete : ({data}) => {
            data.forEach(async element => await unfollow(followedSymbols[element.dataIndex].symbol))
        }
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Paper>
                    <MUIDataTable title={'Following Tickers'}
                                  data={followedSymbols}
                                  columns={columns}
                                  options={options}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default FollowedSymbols;
