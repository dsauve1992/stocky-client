import React from 'react';
import './App.css';
import Futures from '../../../../future/ui/components/Futures/Futures';
import FollowedSymbols from '../../../../followedSymbols/ui/components/FollowedSymbols';

function App() {
    return (
        <div>
            <FollowedSymbols/>
            <Futures/>
        </div>
    )
}

export default App;
