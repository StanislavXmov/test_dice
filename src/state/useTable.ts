import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Cell = {
  x: number;
  y: number;
  id: number;
}

interface ValueState {
  selected: Cell[];
  add: (v: Cell) => void;
  clear: () => void;
}

export const useTable = create<ValueState>()(subscribeWithSelector(set => ({
  selected: [],
  add: (v) => set(((s) => {
    if (s.selected.includes(v)) {
      return {selected: s.selected.filter(c => c.id !== v.id)};
    }
    return {selected: [...s.selected, v]};
  })),
  clear: () => set(() => ({selected: []}))
})));