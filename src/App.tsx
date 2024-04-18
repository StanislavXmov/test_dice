
import { DiceScene } from './components/DiceScene';
import { CoinScene } from './components/CoinScene';
import { DiceControll, DiceTableValue, DiceValueElement } from './components/DiceControll';
import { CoinControll, CoinValueElement } from './components/CoinControll';

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
      
      <div className={styles.app}>
        <CoinScene />
      </div>
      <div className={styles.buttonsWrapper}>
        <CoinControll />
        <CoinValueElement />
      </div>
    </>
  );
}

export default App;
