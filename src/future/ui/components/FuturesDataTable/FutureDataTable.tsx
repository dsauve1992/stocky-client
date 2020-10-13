import {ButtonBase, Card, CardContent, Chip, Grid, Link, Typography, Button} from "@material-ui/core";
import React, {Fragment, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FutureModel from "../../../domain/model";
import MUIDataTable, {MUIDataTableColumn} from "mui-datatables";
import SymbolFollower from "../SymbolFollower/SymbolFollower";
import useFollowedSymbols from "../../../../followedSymbols/ui/hooks/useFollowedSymbols";

type Props = {
    name: string;
    data: FutureModel[];
}

const FutureDataTable: React.FunctionComponent<Props> = ({name, data}) => {

    const {actions: {fetch, follow, unfollow, isFollowedSymbols}} = useFollowedSymbols();

    const setCellProps = () => ({style: {padding: '5px'}});

    useEffect(() => {
        fetch()
    }, [fetch])

    const BLACK_LISTED_INDUSTRY = ['Asset Management', 'Banks—Diversified', 'Beverages—Wineries & Distilleries', 'Coking Coal',
        'Confectioners', 'Insurance—Property & Casualty', 'Insurance—Life', 'Mortgage Finance',
        'Oil & Gas Midstream', 'Publishing', 'Real Estate—Diversified', 'Shell Companies',
        'Textile Manufacturing', 'Utilities—Diversified', 'Utilities—Regulated Gas',
        'REIT—Diversified', 'REIT—Office', 'REIT—Retail', 'REIT—Hotel & Motel', 'REIT—Mortgage',
        'REIT—Industrial', 'REIT—Specialty', 'REIT—Residential', 'Closed-End Fund - Equity',
        'Insurance—Reinsurance', 'Real Estate Services', 'Railroads', 'REIT—Healthcare Facilities',
        'Personal Services', 'Integrated Freight & Logistics', 'Insurance—Diversified',
        'Household & Personal Products',
        'Food Distribution', 'Farm Products',
        'Auto Manufacturers', 'Apparel Manufacturing', "", null]

    const columns: MUIDataTableColumn[] = [
        {
            name: 'symbol', label: 'Symbol',
            options: {
                filterType: 'textField',
                customBodyRenderLite: (dataIndex) => {
                    const row = data[dataIndex]
                    return(<Fragment>
                        {
                            isFollowedSymbols(row.symbol) ?
                                <Button color={'default'} variant={'contained'}
                                        onClick={() => unfollow(row.symbol)}>UnFollow</Button> :
                                <Button color={'default'} variant={'contained'}
                                        onClick={() => follow(row.symbol, row)}>Follow</Button>
                        }
                        <Link href={`https://ca.finance.yahoo.com/chart/${row.symbol}`}>{row.symbol}</Link>
                    </Fragment>)
                },
                setCellProps
            }
        },
        {
            name: 'signal', label: 'Signal',
            options: {
                customBodyRender: value => <Chip label={value} size='small'
                                                 color={value === "BUY" ? 'primary' : 'secondary'}/>,
                setCellProps
            }
        },
        {name: 'current_price', label: 'Price on signal', options: {filter: false, setCellProps}},
        {
            name: 'industry',
            label: 'Industry',
            options: {
                setCellProps,
                filterList: data
                    .filter(entry => entry.industry && !BLACK_LISTED_INDUSTRY.includes(entry.industry))
                    .map(entry => entry.industry!)
            }
        },
    ];

    return (
        <MUIDataTable
            title={name}
            options={{
                filterType: "multiselect",
                selectableRows: "none"
            }}
            columns={columns}
            data={data}/>
    )

}

export default FutureDataTable;
