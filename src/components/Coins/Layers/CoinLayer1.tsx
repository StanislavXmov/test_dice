import { useState } from 'react';

import { CoinScene } from '../CoinScene';
import { CoinControll, CoinTableValue } from '../CoinControll';
import { Switch, SwitchType } from '../../Switch/Switch';
import { CoinsGraph } from '../CoinsGraph/CoinsGraph';

import styles from './Layers.module.scss';


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
          <div className={styles.subTitle}>Что выпало</div>
          <RightSide />
        </div>
      </div>
    </div>
  );
}
