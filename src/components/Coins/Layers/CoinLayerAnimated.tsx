import { useState } from 'react';
import { Vector3 } from 'three';
import { useSpring, animated, config, SpringValue, easings, useTransition} from '@react-spring/web';

import { CoinScene } from '../CoinScene';
import { CoinsGraph } from '../CoinsGraph/CoinsGraph';
import { Coin, useCoinValue } from '../../../state/useCoinValue';
import { useCoinPosition } from '../../../state/useCoinPosition';
import { useRoleCoinButton } from '../../../state/useRoleCoinButton';
import { ResetButton } from '../../ResetButton/ResetButton';
import { Button } from '../../Button/Button';
import { CounterType, Range } from '../../Range/Range';
import { CoinsGraphSeries } from '../CoinsGraph/CoinGraphSeries';

import OrelImage from '../../images/coin/orel.png';
import FiveImage from '../../images/coin/5.png';

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
      <CoinsGraphSeries />
    </div>
  );
}



const CoinControll = ({handleClick, setCoinType}: {handleClick: () => void; setCoinType: (n: number) => void;}) => {
  const [counter, setCounter] = useState<CounterType>(1);
  const [counterView, setCounterView] = useState(false);
  const setValues = useCoinValue(s => s.setValues);
  const disabled = useRoleCoinButton(s => s.disabled);
  const setDisabled = useRoleCoinButton(s => s.setDisabled);

  const handler = () => {

    
    setCounterView(true);
    setTimeout(() => {
      setCounterView(false);
      setDisabled(false);
    }, 1000);

    const values: Coin[] = [];

    
    for (let i = 0; i < counter; i++) {
      const r = randomNumber(0, 1);
      if (i === 0) {
        setCoinType(r);
      }
      if (r === 0) {
        values.push('OREL');
      } else {
        values.push('5');
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

const CoinAnimated = ({springs, coinType}: {springs: {y: SpringValue<number>}; coinType: number}) => {
  let src: string = '';
  if (coinType === null) {
    return;
  }
  if (coinType === 0) {
    src = OrelImage;
  } else if (coinType === 1) {
    src = FiveImage;
  }
  return (
    <animated.div className={styles.coinWrapper} style={{...springs}}>
      <img className={styles.coinImage} src={src} alt="coin"  />
    </animated.div>
  );
}

const ValuesCounter = () => {
  const values = useCoinValue(s => s.values);
  const counter = values.length;

  let counterValue = counter.toString();
  if (counter > 10000) {
    counterValue = `${(counter / 1000).toFixed(1).replace('.', ',')}К`;
  }

  return (
    <div className={styles.subTitle}>Что выпало{counter > 0 ? ` за ${counterValue} ${toCaseCount(counter)}` : ''}</div>
  );
}

export const CoinLayerAnimated = () => {
  const reset = useCoinValue(s => s.reset);
  const [coinType, setCoinType] = useState<null | number>(null);
  const [springs, api] = useSpring(() => ({
    from: { y: 0, opacity: 0, },
    // config: {
    //   tension: 720,
    //   friction: 80
    // },
    config: {
      duration: 500,
      easing: easings.easeInOutCubic,
    },
  }));


  const handleClick = () => {
    api.start({
      from: {
        y: 0,
        opacity: 0,
      },
      to: {
        y: 0,
        opacity: 1
      },
    });
  }
  
  const resetHandler = () => {
    setCoinType(null);
    reset();
  }

  return (
    <div className={styles.layer}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.titleLayer2}>Бросок монеты</h2>
      <div className={styles.wrapper}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <div className={styles.wall}></div>
            <CoinAnimated coinType={coinType} springs={springs} />
          </div>
          <div className={`${styles.buttonsWrapper} ${styles.buttonsWrapperwithoutMargin}`}>
            <CoinControll handleClick={handleClick} setCoinType={setCoinType} />
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
