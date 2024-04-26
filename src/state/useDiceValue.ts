import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Dice = '1'|'2'|'3'|'4'|'5'|'6'|'?';

interface ValueState {
  value: Dice;
  setValue: (v: Dice) => void;
  values: Dice[];
}

const values: Dice[] = [
  '1',
  '2',
  '3',
  '2',
  '3',
  '2',
  '3',
  '3',
  '3',
  '3',
  '3',
  '3',
];

export const useDiceValue = create<ValueState>()(subscribeWithSelector(set => ({
  values: values,
  value: '?',
  setValue: (v) => set(((s) => {
    if (v !== '?') {
      return {value: v, values: [...s.values, v]};
    }
    
    return {value: v};
  })),
})));