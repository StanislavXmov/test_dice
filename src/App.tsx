
import { Switch, SwitchType } from './components/Switch/Switch';
import { useState } from 'react';
import { CoinLayer1 } from './components/Coins/Layers/CoinLayer1';
import { DiceLayer1 } from './components/Dices/Layers/DiceLayer1';
import { TableLayer } from './components/Table/TableLayer';
import { CoinLayer2 } from './components/Coins/Layers/CoinLayer2';
import { DiceLayer2 } from './components/Dices/Layers/DiceLayer2';

import styles from './App.module.scss';

function App() {  
  return (
    <>
      <div className={styles.testWrapper}>
        {/* <CoinLayer1 /> */}
        {/* <CoinLayer2 /> */}
        {/* <DiceLayer1 /> */}
        <DiceLayer2 />
        <TableLayer />
      </div>
    </>
  );
}

export default App;
