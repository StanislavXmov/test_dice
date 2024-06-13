
import { Switch, SwitchType } from './components/Switch/Switch';
import { useState } from 'react';
import { CoinLayer1 } from './components/Coins/Layers/CoinLayer1';
import { DiceLayer1 } from './components/Dices/Layers/DiceLayer1';
import { TableLayer } from './components/Table/TableLayer';
import { CoinLayer2 } from './components/Coins/Layers/CoinLayer2';
import { DiceLayer2 } from './components/Dices/Layers/DiceLayer2';
import { CoinSeries } from './components/Coins/Series/Series';
import { DiceSeries } from './components/Dices/Series/Series';
import { TableLayerType2 } from './components/Table/TableLayerType2';
import { CoinLayerAnimated } from './components/Coins/Layers/CoinLayerAnimated';
import { DiceLayerAnimated } from './components/Dices/Layers/DiceLayerAnimated';

import styles from './App.module.scss';

// {/* <CoinLayer1 /> */}
// {/* <CoinLayer2 /> */}
// {/* <CoinLayerAnimated /> */}
// {/* <DiceLayer1 /> */}
// {/* <DiceLayer2 /> */}
// {/* <DiceLayerAnimated /> */}
// {/* <TableLayer /> */}
// {/* <TableLayerType2 /> */}
// {/* <DiceSeries /> */}
// {/* <CoinSeries /> */}

function App() {  
  return (
    <>
      <div className={styles.testWrapper}>
        <CoinLayer1 />
        <DiceLayer1 />
      </div>
      <div className={styles.testWrapper}>
        <CoinLayerAnimated />
        <DiceLayerAnimated />
      </div>
      <div className={styles.testWrapper}>
        <DiceSeries />
        <CoinSeries />
      </div>
    </>
  );
}

export default App;
