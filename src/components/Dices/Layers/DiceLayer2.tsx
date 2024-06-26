import { useState } from 'react';
import { Vector3 } from 'three';
import random from 'random';


import { DiceScene } from '../DiceScene';
import { DicesGraph } from '../DicesGraph/DicesGraph';
import { Dice, useDiceValue } from '../../../state/useDiceValue';
import { CounterType, Range } from '../../Range/Range';
import { Button } from '../../Button/Button';
import { useDicePosition } from '../../../state/useDicePosition';
import { useRoleDiceButton } from '../../../state/useRoleDiceButton';

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
      <DicesGraph />
    </div>
  );
}

const DiceControll = () => {
  const [counter, setCounter] = useState<CounterType>(1);
  const [counterView, setCounterView] = useState(false);
  const setPosition = useDicePosition(s => s.setPosition);
  const setValue = useDiceValue(s => s.setValue);
  const setValues = useDiceValue(s => s.setValues);
  const setActive = useDiceValue(s => s.setActive);
  const disabled = useRoleDiceButton(s => s.disabled);
  const setDisabled = useRoleDiceButton(s => s.setDisabled);

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

    const values: Dice[] = [];

    if (counter !== 1) {
      for (let i = 0; i < counter; i++) {
        const r = random.int(0, 5);
        if (r === 0) {
          values.push('1');
        } else if (r === 1) {
          values.push('2');
        } else if (r === 2) {
          values.push('3');
        } else if (r === 3) {
          values.push('4');
        } else if (r === 4) {
          values.push('5');
        } else if (r === 5) {
          values.push('6');
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

const ValuesCounter = () => {
  const values = useDiceValue(s => s.values);
  const counter = values.length;

  return (
    <div className={styles.subTitle}>Что выпало{counter > 0 ? ` за ${counter} ${toCaseCount(counter)}` : ''}</div>
  );
}

export const DiceLayer2 = () => {
  return (
    <div className={styles.layer}>
      <h2 className={styles.title}>Бросок кубика</h2>
      <div className={styles.wrapper}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <DiceScene />
          </div>
          <div className={styles.buttonsWrapper}>
            <DiceControll />
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
