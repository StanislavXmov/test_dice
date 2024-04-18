import { Vector3 } from "three";
import { Button } from "./Button/Button";
import { useCoinValue } from "../state/useCoinValue";
import { useCoinPosition } from "../state/useCoinPosition";
import { useRoleCoinButton } from "../state/useRoleCoinButton";

import Coin1 from './icons/coin_1.svg?react';
import Coin2 from './icons/coin_2.svg?react';

import styles from '../App.module.scss';

const coins = {
  'OREL': <Coin1 className={styles.diceIcon} />,
  '5': <Coin2 className={styles.diceIcon} />,
  '?': <span className={styles.diceIcon} >?</span>,
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