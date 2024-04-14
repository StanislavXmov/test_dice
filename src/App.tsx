import { Vector3 } from 'three';

import { useDicePosition } from './state/useDicePosition';
import { useDiceValue } from './state/useDiceValue';
import { DiceScene } from './components/DiceScene';

import styles from './App.module.scss';
import { CoinScene } from './components/CoinScene';
import { useCoinPosition } from './state/useCoinPosition';
import { useCoinValue } from './state/useCoinValue';

import Dice1 from './components/icons/dice_1.svg?react';
import Dice2 from './components/icons/dice_2.svg?react';
import Dice3 from './components/icons/dice_3.svg?react';
import Dice4 from './components/icons/dice_4.svg?react';
import Dice5 from './components/icons/dice_5.svg?react';
import Dice6 from './components/icons/dice_6.svg?react';
import Coin1 from './components/icons/coin_1.svg?react';
import Coin2 from './components/icons/coin_2.svg?react';

const dices = {
  1: <Dice1 className={styles.diceIcon} />,
  2: <Dice2 className={styles.diceIcon} />,
  3: <Dice3 className={styles.diceIcon} />,
  4: <Dice4 className={styles.diceIcon} />,
  5: <Dice5 className={styles.diceIcon} />,
  6: <Dice6 className={styles.diceIcon} />,
  '?': <span className={styles.diceIcon} >?</span>,
}

const coins = {
  'OREL': <Coin1 className={styles.diceIcon} />,
  '5': <Coin2 className={styles.diceIcon} />,
  '?': <span className={styles.diceIcon} >?</span>,
}

const ValueElement = () => {
  const value = useDiceValue(s => s.value);
  return (
    <div>{dices[value]}</div>
  );
}

const CoinValueElement = () => {
  const value = useCoinValue(s => s.value);
  return (
    <div>{coins[value]}</div>
  );
}

const RoleElement = () => {
  const setPosition = useDicePosition(s => s.setPosition);
  const setValue = useDiceValue(s => s.setValue);

  return (
    <button
      className={styles.button}
      onClick={() => {
        setPosition(new Vector3(0, 5, 0));
        setValue('?');
      }}
    >
      ROLE
    </button>
  );
}

const RoleCoinElement = () => {
  const setPosition = useCoinPosition(s => s.setPosition);
  const setValue = useCoinValue(s => s.setValue);

  return (
    <button
      className={styles.button}
      onClick={() => {
        setPosition(new Vector3(0, 7, 0));
        setValue('?');
      }}
    >
      ROLE COIN
    </button>
  );
}

function App() {  
  return (
    <>
      <div className={styles.app}>
        <DiceScene />
        <div className={styles.buttonsWrapper}>
          <RoleElement />
          <ValueElement />
        </div>
      </div>
      <div className={styles.app}>
        <CoinScene />
        <div className={styles.buttonsWrapper}>
          <RoleCoinElement />
          <CoinValueElement />
        </div>
      </div>
    </>
    
  );
}

export default App;
