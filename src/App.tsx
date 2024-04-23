
import { DiceScene } from './components/DiceScene';
import { CoinScene } from './components/CoinScene';
import { DiceControll, DiceTableValue, DiceValueElement } from './components/DiceControll';
import { CoinControll, CoinTableValue, CoinValueElement } from './components/CoinControll';

import styles from './App.module.scss';
import { Range } from './components/Range/Range';
import { CoinsGraph } from './components/Coins/CoinsGraph/CoinsGraph';

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
      </div> */}
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
