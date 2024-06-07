import { useState } from 'react';
import { Vector3 } from 'three';
import { DiceScene } from '../DiceScene';
import { DiceControll, DiceTableValue } from '../DiceControll';
import { Switch, SwitchType } from '../../Switch/Switch';
import { DicesGraph } from '../DicesGraph/DicesGraph';
import { useDiceValue } from '../../../state/useDiceValue';
import { ResetButton } from '../../ResetButton/ResetButton';
import { useDicePosition } from '../../../state/useDicePosition';

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
    <div className={styles.subTitleLayer1}>Что выпало{counter > 0 ? ` за ${counter} ${toCaseCount(counter)}` : ''}</div>
  );
}

export const DiceLayer1 = () => {
  const reset = useDiceValue(s => s.reset);
  const setValue = useDiceValue(s => s.setValue);
  const setPosition = useDicePosition(s => s.setPosition);

  const resetHandler = () => {
    reset();
    setPosition(new Vector3(0, 7, 0));
    setValue('?');
  }

  return (
    <div className={styles.layer1}>
      <ResetButton cb={resetHandler} />
      <h2 className={styles.title}>Бросок кубика</h2>
      <div className={styles.wrapper1}>
        <div className={styles.sideLeft}>
          <div className={styles.scene}>
            <DiceScene />
          </div>
          <div className={styles.buttonsWrapper}>
            <DiceControll />
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
