
import { DiceScene } from './components/Dices/DiceScene';
import { CoinScene } from './components/Coins/CoinScene';
import { DiceControll, DiceTableValue, DiceValueElement } from './components/Dices/DiceControll';
import { CoinControll, CoinTableValue, CoinValueElement } from './components/Coins/CoinControll';
import { Range } from './components/Range/Range';
import { CoinsGraph } from './components/Coins/CoinsGraph/CoinsGraph';
import { DicesGraph } from './components/Dices/DicesGraph/DicesGraph';

import styles from './App.module.scss';
import { Switch, SwitchType } from './components/Switch/Switch';
import { useState } from 'react';
import { CoinLayer1 } from './components/Coins/Layers/CoinLayer1';
import { DiceLayer1 } from './components/Dices/Layers/DiceLayer1';


function App() {  
  return (
    <>
      {/* <div className={styles.wrapper}>
        <div>
          <div className={styles.app}>
            <DiceScene />
          </div>
          <div className={styles.buttonsWrapper}>
            <DiceControll />
            <DiceValueElement />
          </div>
        </div>
        <DiceTableValue />
        <DicesGraph />
      </div>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.app}>
            <CoinScene />
          </div>
          <div className={styles.buttonsWrapper}>
            <CoinControll />
            <CoinValueElement />
          </div>
        </div>
        <CoinTableValue />
        <CoinsGraph />
      </div>
      <Range />*/}
      <div className={styles.testWrapper}>
        <CoinLayer1 />
        <DiceLayer1 />
      </div>
    </>
  );
}

export default App;
