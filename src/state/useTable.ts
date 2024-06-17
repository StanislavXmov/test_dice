import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Cell = {
  x: number;
  y: number;
  id: number;
}

export type Edge = 6 | 8 | 12;

interface ValueState {
  selected: Cell[];
  add: (v: Cell) => void;
  addMore: (v: Cell[]) => void;
  removeIds: (ids: number[]) => void;
  clear: () => void;
  type: Edge;
  setType: (v: Edge) => void;
}

export const useTableType1 = create<ValueState>()(subscribeWithSelector(set => ({
  type: 6,
  setType: (v) => set(() => ({type: v})),
  selected: [],
  add: (v) => set(((s) => {
    const finded = s.selected.find(f => f.id === v.id);
    if (finded) {
      return {selected: s.selected.filter(c => c.id !== v.id)};
    }
    return {selected: [...s.selected, v]};
  })),
  addMore: (v) => set(((s) => {
    return {selected: [...s.selected, ...v]};
  })),
  removeIds: (ids) => set(((s) => {
    let list = [...s.selected];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      list = list.filter(c => c.id !== id);
    }
    return {selected: list};
  })),
  clear: () => set(() => ({selected: []}))
})));

export const useTableType2 = create<ValueState>()(subscribeWithSelector(set => ({
  type: 6,
  setType: (v) => set(() => ({type: v})),
  selected: [],
  add: (v) => set(((s) => {
    const finded = s.selected.find(f => f.id === v.id);
    if (finded) {
      return {selected: s.selected.filter(c => c.id !== v.id)};
    }
    return {selected: [...s.selected, v]};
  })),
  addMore: (v) => set(((s) => {
    return {selected: [...s.selected, ...v]};
  })),
  removeIds: (ids) => set(((s) => {
    let list = [...s.selected];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      list = list.filter(c => c.id !== id);
    }
    return {selected: list};
  })),
  clear: () => set(() => ({selected: []}))
})));