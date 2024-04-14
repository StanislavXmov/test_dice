import { Vector3 } from 'three';

import { useDicePosition } from './state/useDicePosition';
import { useDiceValue } from './state/useDiceValue';
import { DiceScene } from './components/DiceScene';

import styles from './App.module.scss';
import { CoinScene } from './components/CoinScene';
import { useCoinPosition } from './state/useCoinPosition';
import { useCoinValue } from './state/useCoinValue';

const ValueElement = () => {
  const value = useDiceValue(s => s.value);
  return (
    <button
      className={styles.button}
    >
      {value}
    </button>
  );
}

const CoinValueElement = () => {
  const value = useCoinValue(s => s.value);
  return (
    <button
      className={styles.button}
    >
      {value}
    </button>
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
