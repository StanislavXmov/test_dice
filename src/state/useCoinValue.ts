import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coin = 'OREL' | '5' | '?'

interface ValueState {
  isActive: boolean;
  setActive: (v: boolean) => void;
  value: Coin;
  setValue: (v: Coin) => void;
  setValues: (v: Coin[]) => void;
  values: Coin[];
  reset : () => void;
}

const test_values: Coin[] = [
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  '5',
  

];

export const useCoinValue = create<ValueState>()(subscribeWithSelector(set => ({
  isActive: true,
  values: test_values,
  value: '?',
  setValue: (v) => set(((s) => {
    if (v !== '?') {
      return {value: v, values: [...s.values, v]};
    }

    return {value: v};
  })),
  setValues: (v) => set(((s) => {
    return {values: [...s.values, ...v]};
  })),
  setActive: (v) => set(() => ({isActive: v})),
  reset: () => set(() => ({values: []})),
})));