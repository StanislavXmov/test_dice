import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface ValueState {
  value: string;
  setValue: (v: string) => void;
}

export const useValue = create<ValueState>()(subscribeWithSelector(set => ({
  value: '?',
  setValue: (v) => set((() => ({value: v}))),
})));