import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Dice = '1'|'2'|'3'|'4'|'5'|'6'|'?';

interface ValueState {
  value: Dice;
  setValue: (v: Dice) => void;
}

export const useDiceValue = create<ValueState>()(subscribeWithSelector(set => ({
  value: '?',
  setValue: (v) => set((() => ({value: v}))),
})));