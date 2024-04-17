import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coin = 'OREL' | '5' | '?'

interface ValueState {
  value: Coin;
  setValue: (v: Coin) => void;
}

export const useCoinValue = create<ValueState>()(subscribeWithSelector(set => ({
  value: '?',
  setValue: (v) => set((() => ({value: v}))),
})));