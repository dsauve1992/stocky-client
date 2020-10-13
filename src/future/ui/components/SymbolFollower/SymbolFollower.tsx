import {Button} from "@material-ui/core";
import React from "react";

interface SymbolFollowerProps {
    symbol : string
}

const SymbolFollower : React.FunctionComponent<SymbolFollowerProps> = ({symbol}) => {
    return (<Button size={'small'} variant={"outlined"}>Follow</Button>)
}

export default SymbolFollower;
