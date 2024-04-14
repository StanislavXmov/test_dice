import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ValueState {
  value: string;
  setValue: (v: string) => void;
}

export const useCoinValue = create<ValueState>()(subscribeWithSelector(set => ({
  value: '?',
  setValue: (v) => set((() => ({value: v}))),
})));