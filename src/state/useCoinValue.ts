import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coin = 'OREL' | '5' | '?'

interface ValueState {
  value: Coin;
  setValue: (v: Coin) => void;
  values: Coin[];
}

const test_values: Coin[] = [
  
];

export const useCoinValue = create<ValueState>()(subscribeWithSelector(set => ({
  values: test_values,
  value: '?',
  setValue: (v) => set(((s) => {
    if (v !== '?') {
      return {value: v, values: [...s.values, v]};
    }

    return {value: v};
  })),
})));