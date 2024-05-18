
import { Switch, SwitchType } from './components/Switch/Switch';
import { useState } from 'react';
import { CoinLayer1 } from './components/Coins/Layers/CoinLayer1';
import { DiceLayer1 } from './components/Dices/Layers/DiceLayer1';
import { TableLayer } from './components/Table/TableLayer';
import { CoinLayer2 } from './components/Coins/Layers/CoinLayer2';
import { DiceLayer2 } from './components/Dices/Layers/DiceLayer2';
import { CoinSeries } from './components/Coins/Series/Series';

import styles from './App.module.scss';
import { DiceSeries } from './components/Dices/Series/Series';

function App() {  
  return (
    <>
      <div className={styles.testWrapper}>
        {/* <CoinLayer1 /> */}
        {/* <CoinLayer2 /> */}
        {/* <DiceLayer1 /> */}
        {/* <DiceLayer2 /> */}
        {/* <TableLayer /> */}
        <CoinSeries />
        <DiceSeries />
      </div>
    </>
  );
}

export default App;
