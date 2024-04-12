import { Vector3 } from 'three';

import { usePosition } from './state/usePosition';
import { useValue } from './state/useValue';
import { DiceScene } from './components/DiceScene';

import styles from './App.module.scss';

const ValueElement = () => {
  const value = useValue(s => s.value);
  return (
    <button
      className={styles.button}
    >
      {value}
    </button>
  );
}

const RoleElement = () => {
  const setPosition = usePosition(s => s.setPosition);
  const setValue = useValue(s => s.setValue);

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

function App() {  
  return (
    <div className={styles.app}>
      <DiceScene />
      <div className={styles.buttonsWrapper}>
        <RoleElement />
        <ValueElement />
      </div>
    </div>
  );
}

export default App;
