import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Dice = '1'|'2'|'3'|'4'|'5'|'6'|'?';

interface ValueState {
  isActive: boolean;
  setActive: (v: boolean) => void;
  value: Dice;
  setValue: (v: Dice) => void;
  setValues: (v: Dice[]) => void;
  values: Dice[];
  reset : () => void;
}

const values: Dice[] = [];
// const values: Dice[] = new Array(12).fill('2');

export const useDiceValue = create<ValueState>()(subscribeWithSelector(set => ({
  isActive: true,
  values: values,
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

export const useDiceSeriesValue = create<ValueState>()(subscribeWithSelector(set => ({
  isActive: true,
  values: values,
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