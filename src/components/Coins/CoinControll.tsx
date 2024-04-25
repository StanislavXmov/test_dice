import { Key } from "react";
import { Vector3 } from "three";
import { Button } from "../Button/Button";
import { useCoinValue } from "../../state/useCoinValue";
import { useCoinPosition } from "../../state/useCoinPosition";
import { useRoleCoinButton } from "../../state/useRoleCoinButton";

import Coin1 from '../icons/coin_1.svg?react';
import Coin2 from '../icons/coin_2.svg?react';

import styles from './Coins.module.scss';


const coins = {
  'OREL': <Coin1 className={styles.coinIcon} />,
  '5': <Coin2 className={styles.coinIcon} />,
  '?': <span className={styles.coinIcon} >?</span>,
}

const coinsTable = {
  'OREL': (key: Key) => <Coin1 className={styles.coinIconTable} key={key} />,
  '5': (key: Key) => <Coin2 className={styles.coinIconTable} key={key} />,
  '?': (key: Key) => <span className={styles.coinIconTable} key={key} >?</span>,
}

export const CoinControll = () => {
  const setPosition = useCoinPosition(s => s.setPosition);
  const setValue = useCoinValue(s => s.setValue);
  const disabled = useRoleCoinButton(s => s.disabled);
  const setDisabled = useRoleCoinButton(s => s.setDisabled);

  const handler = () => {
    setPosition(new Vector3(0, 7, 0));
    setValue('?');
  }

  return (
    <Button
      tittle='ROLE COIN'
      cb={handler}
      disabled={disabled}
      setDisabled={setDisabled}
      timeout={5000}
    />
  );
}

export const CoinValueElement = () => {
  const value = useCoinValue(s => s.value);
  return coins[value];
}

export const CoinTableValue = () => {
  const values = useCoinValue(s => s.values);
  
  return (
    <div className={styles.table}>
      {values.map((v, i) => coinsTable[v](i))}
    </div>
  );
}