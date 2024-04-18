import { Key } from 'react';
import { Vector3 } from 'three';
import { Button } from './Button/Button';
import { useDicePosition } from '../state/useDicePosition';
import { useRoleDiceButton } from '../state/useRoleDiceButton';
import { useDiceValue } from '../state/useDiceValue';

import Dice1 from './icons/dice_1.svg?react';
import Dice2 from './icons/dice_2.svg?react';
import Dice3 from './icons/dice_3.svg?react';
import Dice4 from './icons/dice_4.svg?react';
import Dice5 from './icons/dice_5.svg?react';
import Dice6 from './icons/dice_6.svg?react';

import styles from '../App.module.scss';

const dices = {
  1: <Dice1 className={styles.diceIcon} />,
  2: <Dice2 className={styles.diceIcon} />,
  3: <Dice3 className={styles.diceIcon} />,
  4: <Dice4 className={styles.diceIcon} />,
  5: <Dice5 className={styles.diceIcon} />,
  6: <Dice6 className={styles.diceIcon} />,
  '?': <span className={styles.diceIcon} >?</span>,
}

const dicesTable = {
  1: (key: Key) => <Dice1 className={styles.diceIconTable} key={key} />,
  2: (key: Key) => <Dice2 className={styles.diceIconTable} key={key} />,
  3: (key: Key) => <Dice3 className={styles.diceIconTable} key={key} />,
  4: (key: Key) => <Dice4 className={styles.diceIconTable} key={key} />,
  5: (key: Key) => <Dice5 className={styles.diceIconTable} key={key} />,
  6: (key: Key) => <Dice6 className={styles.diceIconTable} key={key} />,
  '?': (key: Key) =>  <span className={styles.diceIconTable} key={key} >?</span>,
}

// export const TestDice = () => {
//   return new Array(50).fill(true).map((_, i) => 
//     <Dice1 key={i} className={styles.diceIconTable} />
//   );
// }

export const DiceControll = () => {
  const setPosition = useDicePosition(s => s.setPosition);
  const setValue = useDiceValue(s => s.setValue);
  const disabled = useRoleDiceButton(s => s.disabled);
  const setDisabled = useRoleDiceButton(s => s.setDisabled);

  const handler = () => {
    setPosition(new Vector3(0, 5, 0));
    setValue('?');
  }

  return (
    <Button
      tittle='ROLE'
      cb={handler}
      disabled={disabled}
      setDisabled={setDisabled}
      timeout={3000}
    />
  );
}

export const DiceValueElement = () => {
  const value = useDiceValue(s => s.value);
  return dices[value];
}

export const DiceTableValue = () => {
  const values = useDiceValue(s => s.values);
  
  return (
    <div className={styles.table}>
      {values.map((v, i) => dicesTable[v](i))}
    </div>
  );
}
