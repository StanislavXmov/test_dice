import { useState } from 'react';
import { Vector3 } from 'three';

import { CoinScene } from '../CoinScene';
import { CoinsGraph } from '../CoinsGraph/CoinsGraph';
import { Coin, useCoinValue } from '../../../state/useCoinValue';
import { useCoinPosition } from '../../../state/useCoinPosition';
import { useRoleCoinButton } from '../../../state/useRoleCoinButton';

import { Button } from '../../Button/Button';
import { CounterType, Range } from '../../Range/Range';

import styles from './Layers.module.scss';

const toCaseCount = (arg: number) => {
  let titles = ['бросок', 'броска', 'бросков'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

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
  const [counter, setCounter] = useState<CounterType>(1);
  const [counterView, setCounterView] = useState(false);
  const setPosition = useCoinPosition(s => s.setPosition);
  const setValue = useCoinValue(s => s.setValue);
  const setValues = useCoinValue(s => s.setValues);
  const setActive = useCoinValue(s => s.setActive);
  const disabled = useRoleCoinButton(s => s.disabled);
  const setDisabled = useRoleCoinButton(s => s.setDisabled);

  const handler = () => {
    if (counter !== 1) {
      setActive(false);
      setCounterView(true);
      // setDisabled(false);
      setTimeout(() => {
        setCounterView(false);
      }, 1000);
    } else {
      setActive(true);
    }
    
    setPosition(new Vector3(0, 7, 0));
    setValue('?');

    const values: Coin[] = [];

    if (counter !== 1) {
      for (let i = 0; i < counter; i++) {
        const r = randomNumber(0, 1);
        if (r === 0) {
          values.push('OREL');
        } else {
          values.push('5');
        }
      }

      setValues(values);
    }
  }

  return (
    <div className={styles.coinControllWrapper}>
      <div className={`${styles.counter} ${counterView ? styles.counterVisible : ''}`}>× {counter}</div>
      <Button
        title={`Бросить ${counter} раз`}
        cb={handler}
        disabled={disabled}
        setDisabled={setDisabled}
        timeout={counter === 1 ? 5000 : 1000}
      />
      <Range setCounter={setCounter} />
    </div>
  );
}

const CoinAnimated = () => {
  return (
    <h2>CoinAnimated</h2>
  );
}

const ValuesCounter = () => {
  const values = useCoinValue(s => s.values);
  const counter = values.length;

  return (
    <div className={styles.subTitle}>Что выпало{counter > 0 ? ` за ${counter} ${toCaseCount(counter)}` : ''}</div>
  );
}

export const CoinLayerAnimated = () => {
  return (
    <div className={styles.layer}>
      <h2 className={styles.title}>Бросок монеты</h2>
      <div className={styles.wrapper}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <CoinAnimated />
          </div>
          <div className={styles.buttonsWrapper}>
            <CoinControll />
          </div>
        </div>
        <div className={styles.sideRight}>
          <ValuesCounter />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
