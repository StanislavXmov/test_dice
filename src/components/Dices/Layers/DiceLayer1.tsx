import { useState } from 'react';

import { DiceScene } from '../DiceScene';
import { DiceControll, DiceTableValue } from '../DiceControll';
import { Switch, SwitchType } from '../../Switch/Switch';
import { DicesGraph } from '../DicesGraph/DicesGraph';
import { useDiceValue } from '../../../state/useDiceValue';

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
          <DiceTableValue />
        )}
        {type === 'Graph' && (
          <DicesGraph />
        )}
      </div>
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
          <ValuesCounter />
          <RightSide />
        </div>
      </div>
    </div>
  );
}
