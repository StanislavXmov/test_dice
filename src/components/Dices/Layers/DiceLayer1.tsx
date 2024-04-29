import { useState } from 'react';

import { DiceScene } from '../DiceScene';
import { DiceControll, DiceTableValue } from '../DiceControll';
import { Switch, SwitchType } from '../../Switch/Switch';
import { DicesGraph } from '../DicesGraph/DicesGraph';

import styles from './Layers.module.scss';


const RightSide = () => {
  const [type, setType] = useState<SwitchType>('List');
  return (
    <div>
      <Switch onChange={setType} type={type} />
      <div>
        {type === 'List' && (
          <DiceTableValue />
        )}
        {type === 'Graph' && (
          <DicesGraph />
        )}
      </div>
    </div>
  );
}

export const DiceLayer1 = () => {
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
          <div className={styles.subTitle}>Что выпало</div>
          <RightSide />
        </div>
      </div>
    </div>
  );
}
