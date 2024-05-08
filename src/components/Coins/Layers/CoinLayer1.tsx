import { useState } from 'react';

import { CoinScene } from '../CoinScene';
import { CoinControll, CoinTableValue } from '../CoinControll';
import { Switch, SwitchType } from '../../Switch/Switch';
import { CoinsGraph } from '../CoinsGraph/CoinsGraph';
import { useCoinValue } from '../../../state/useCoinValue';

import styles from './Layers.module.scss';


const toCaseCount = (arg: number) => {
  let titles = ['бросок', 'броска', 'бросков'];
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(arg % 100 > 4 && arg % 100 < 20) ? 2 : cases[Math.min(arg % 10, 5)]];
}

const RightSide = () => {
  const [type, setType] = useState<SwitchType>('List');
  return (
    <div>
      <Switch onChange={setType} type={type} />
      <div>
        {type === 'List' && (
          <CoinTableValue />
        )}
        {type === 'Graph' && (
          <CoinsGraph />
        )}
      </div>
    </div>
  );
}

const ValuesCounter = () => {
  const values = useCoinValue(s => s.values);
  const counter = values.length;

  return (
    <div className={styles.subTitle}>Что выпало{counter > 0 ? ` за ${counter} ${toCaseCount(counter)}` : ''}</div>
  );
}

export const CoinLayer1 = () => {
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
          <ValuesCounter />
          <RightSide />
        </div>
      </div>
    </div>
  );
}