
import { DiceScene } from './components/Dices/DiceScene';
import { CoinScene } from './components/Coins/CoinScene';
import { DiceControll, DiceTableValue, DiceValueElement } from './components/Dices/DiceControll';
import { CoinControll, CoinTableValue, CoinValueElement } from './components/Coins/CoinControll';

import { Range } from './components/Range/Range';
import { CoinsGraph } from './components/Coins/CoinsGraph/CoinsGraph';

import styles from './App.module.scss';

function App() {  
  return (
    <>
      <div className={styles.wrapper}>
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
      <Range />
    </>
  );
}

export default App;
