import { useState } from 'react';

import { CoinScene } from '../CoinScene';
import { Switch, SwitchType } from '../../Switch/Switch';
import { CoinsGraph } from '../CoinsGraph/CoinsGraph';
import { useCoinValue } from '../../../state/useCoinValue';

import styles from './Layers.module.scss';
import { useCoinPosition } from '../../../state/useCoinPosition';
import { useRoleCoinButton } from '../../../state/useRoleCoinButton';
import { Vector3 } from 'three';
import { Button } from '../../Button/Button';
import { CounterType, Range } from '../../Range/Range';


const toCaseCount = (arg: number) => {
  let titles = ['бросок', 'броска', 'бросков'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

// randomNumber(min, max) {
//   return Math.random() * (max - min) + min
// }

// randomRoundNumber(min, max, array) {
//   let r = Math.round(this.randomNumber(min, max));
//   if (array && array.includes(r)) {
//       return this.randomRoundNumber(min, max, array);
//   } else {
//       return r;
//   }
// }

const randomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
}


const RightSide = () => {

  return (
    <div>
      <CoinsGraph />
    </div>
  );
}



const CoinControll = () => {
  const [counter, setCounter] = useState<CounterType>(5); 
  const setPosition = useCoinPosition(s => s.setPosition);
  const setValue = useCoinValue(s => s.setValue);
  const disabled = useRoleCoinButton(s => s.disabled);
  const setDisabled = useRoleCoinButton(s => s.setDisabled);

  const handler = () => {
    setPosition(new Vector3(0, 7, 0));
    setValue('?');
    
    for (let i = 0; i < counter; i++) {
      console.log(randomNumber(0, 1));
    }
  }

  return (
    <div className={styles.coinControllWrapper}>
      <Button
        title={`Бросить ${counter} раз`}
        cb={handler}
        disabled={disabled}
        setDisabled={setDisabled}
        timeout={5000}
      />
      <Range setCounter={setCounter} />
    </div>
  );
}

export const CoinLayer2 = () => {
  return (
    <div className={styles.layer}>
      <h2 className={styles.title}>Бросок монеты</h2>
      <div className={styles.wrapper}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <CoinScene />
          </div>
          <div className={styles.buttonsWrapper}>
            <CoinControll />
          </div>
        </div>
        <div className={styles.sideRight}>
          <div className={styles.subTitleWrapper}>
            <div className={styles.subTitle}>Выпавшие значения</div>
            <div className={styles.subTitle}>на графике</div>
          </div>
            <RightSide />
        </div>
      </div>
    </div>
  );
}
