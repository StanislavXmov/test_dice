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
