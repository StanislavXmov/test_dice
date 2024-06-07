import { useState } from 'react';
import { Vector3 } from 'three';
import random from 'random';
import { SpringValue, useSpring, animated } from '@react-spring/web';

import { DiceScene } from '../DiceScene';
import { DicesGraph } from '../DicesGraph/DicesGraph';
import { Dice, useDiceValue } from '../../../state/useDiceValue';
import { CounterType, Range } from '../../Range/Range';
import { Button } from '../../Button/Button';
import { useDicePosition } from '../../../state/useDicePosition';
import { useRoleDiceButton } from '../../../state/useRoleDiceButton';
import { ResetButton } from '../../ResetButton/ResetButton';
import { DicesGraphSeries } from '../DicesGraph/DiceGraphSeries';

import Dice1Image from '../../images/dice/1.png';
import Dice2Image from '../../images/dice/2.png';
import Dice3Image from '../../images/dice/3.png';
import Dice4Image from '../../images/dice/4.png';
import Dice5Image from '../../images/dice/5.png';
import Dice6Image from '../../images/dice/6.png';

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
    <div className={styles.graphMargin}> 
      <DicesGraphSeries />
    </div>
  );
}

const DiceControll = ({handleClick, setDiceType}: {handleClick: () => void; setDiceType: (n: number) => void;}) => {
  const [counter, setCounter] = useState<CounterType>(1);
  const [counterView, setCounterView] = useState(false);
  const setPosition = useDicePosition(s => s.setPosition);
  const setValue = useDiceValue(s => s.setValue);
  const setValues = useDiceValue(s => s.setValues);
  const setActive = useDiceValue(s => s.setActive);
  const disabled = useRoleDiceButton(s => s.disabled);
  const setDisabled = useRoleDiceButton(s => s.setDisabled);

  const handler = () => {
    
    setCounterView(true);
      setTimeout(() => {
        setCounterView(false);
        setDisabled(false);
      }, 1000);
    
    const values: Dice[] = [];

  
    for (let i = 0; i < counter; i++) {
      const r = random.int(0, 5);
      if (i === 0) {
        setDiceType(r);
      }
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

    handleClick();
    setValues(values);
  
  }

  return (
    <div className={styles.coinControllWrapper}>
      <div className={`${styles.counter} ${counterView ? styles.counterVisible : ''}`}>× {counter}</div>
      <Range setCounter={setCounter} />
      <Button
        title={`Бросить ${counter} раз`}
        cb={handler}
        disabled={disabled}
        setDisabled={setDisabled}
        timeout={counter === 1 ? 5000 : 1000}
      />
    </div>
  );
}

const ValuesCounter = () => {
  const values = useDiceValue(s => s.values);
  const counter = values.length;

  let counterValue = counter.toString();
  if (counter > 10000) {
    counterValue = `${(counter / 1000).toFixed(1).replace('.', ',')}К`;
  }

  return (
    <div className={styles.subTitleLayer2}>Что выпало{counter > 0 ? ` за ${counterValue} ${toCaseCount(counter)}` : ''}</div>
  );
}

const DiceAnimated = ({springs, diceType}: {springs: {y: SpringValue<number>}; diceType: number}) => {
  let src = '';
  if (diceType === null) {
    return;
  }
  if (diceType === 0) {
    src = Dice1Image;
  } else if (diceType === 1) {
    src = Dice2Image;
  } else if (diceType === 2) {
    src = Dice3Image;
  } else if (diceType === 3) {
    src = Dice4Image;
  } else if (diceType === 4) {
    src = Dice5Image;
  } else if (diceType === 5) {
    src = Dice6Image;
  }
  return (
    <animated.div className={styles.diceWrapper} style={{...springs}}>
      <img className={styles.diceImage} src={src} alt="dice"  />
    </animated.div>
  );
}

export const DiceLayerAnimated = () => {
  const reset = useDiceValue(s => s.reset);
  const [diceType, setDiceType] = useState<null | number>(0);
  const [springs, api] = useSpring(() => ({
    from: { y: -100, opacity: 0, },
    config: {
      tension: 720,
      friction: 80
    }
  }));

  const handleClick = () => {
    api.start({
      from: {
        y: -120,
        opacity: 0,
      },
      to: {
        y: 0,
        opacity: 1
      },
    });
  }
  
  const resetHandler = () => {
    setDiceType(null);
    reset();
  }
  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.titleLayer2}>Бросок кубика</h2>
      <div className={styles.wrapper}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <div className={styles.wall}></div>
            <DiceAnimated diceType={diceType} springs={springs} />
          </div>
          <div className={`${styles.buttonsWrapper} ${styles.buttonsWrapperwithoutMargin}`}>
            <DiceControll handleClick={handleClick} setDiceType={setDiceType} />
          </div>
        </div>
        <div className={styles.sideRightLayer1}>
          <ValuesCounter />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
