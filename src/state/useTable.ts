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

interface OneConditionState {
  selected: Cell[];
  add: (v: Cell) => void;
  addMore: (v: Cell[]) => void;
  removeIds: (ids: number[]) => void;
  clear: () => void;
}

export const useOneConditionTable = create<OneConditionState>()(subscribeWithSelector(set => ({
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

export type Type = 'Type1' | 'Type2' | 'Type3';

export type TwoConditionCell = Cell & {type1: boolean, type2: boolean, type3: boolean};

interface TwoConditionState {
  selected: TwoConditionCell[];
  add: (v: TwoConditionCell) => void;
  addMore: (v: TwoConditionCell[]) => void;
  removeIds: (ids: number[]) => void;
  clear: () => void;
  type: Type;
  setType: (v: Type) => void;
}

export const useTwoConditionTable = create<TwoConditionState>()(subscribeWithSelector(set => ({
  selected: [],
  type: 'Type1',
  add: (v) => set(((s) => {
    const type = s.type;
    if (type === 'Type3') {
      return {};
    }

    const finded = s.selected.find(f => f.id === v.id);
    if (finded) {
      if (type === "Type1") {
        if (finded.type2) {
          if (finded.type1) {
            finded.type1 = false;
            if (finded.type3) {
              finded.type3 = false;
            }
          } else {
            finded.type1 = true;
            finded.type3 = true;
          }
          return {selected: [...s.selected]};
        } else {
          finded.type1 = false;
          return {selected: s.selected.filter(c => c.id !== v.id)};
        }
      } else if (type === "Type2") {
        if (finded.type1) {
          if (finded.type2) {
            finded.type2 = false;
            if (finded.type3) {
              finded.type3 = false;
            }
          } else {
            finded.type2 = true;
            finded.type3 = true;
          }
          return {selected: [...s.selected]};
        } else {
          finded.type2 = false;
          return {selected: s.selected.filter(c => c.id !== v.id)};
        }
      }
    } else {
      if (type === "Type1") {
        if (v.type2) {
          v.type1 = true;
          v.type3 = true;
        } else {
          v.type1 = true;
        }
      } else if (type === "Type2") {
        if (v.type1) {
          v.type2 = true;
          v.type3 = true;
        } else {
          v.type2 = true;
        }
      }
  
      return {selected: [...s.selected, v]};
    }
  })),
  addMore: (v) => set(((s) => {
    const type = s.type;
    if (type === "Type1") {
      v.forEach(p => {p.type1 = true;})
    }
    if (type === "Type2") {
      v.forEach(p => {p.type2 = true;})
    }
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
  clear: () => set(() => ({selected: []})),
  setType: (v) => set(() => ({type: v})),
})));

type OutcomeTableState = {
  cellType: Type;
  setCellType: (v: Type) => void;
  selected: TwoConditionCell[];
  add: (v: TwoConditionCell) => void;
  addMore: (v: TwoConditionCell[]) => void;
  removeIds: (ids: number[]) => void;
  clear: () => void;
  type: Edge;
  setType: (v: Edge) => void;
}

export const useOutcomeTable = create<OutcomeTableState>()(subscribeWithSelector(set => ({
  type: 6,
  setType: (v) => set(() => ({type: v})),
  selected: [],
  add: (v) => set(((s) => {
    const type = s.cellType;
    if (type === 'Type3') {
      return {};
    }

    const finded = s.selected.find(f => f.id === v.id);
    if (finded) {
      if (type === "Type1") {
        if (finded.type2) {
          if (finded.type1) {
            finded.type1 = false;
            if (finded.type3) {
              finded.type3 = false;
            }
          } else {
            finded.type1 = true;
            finded.type3 = true;
          }
          return {selected: [...s.selected]};
        } else {
          finded.type1 = false;
          return {selected: s.selected.filter(c => c.id !== v.id)};
        }
      } else if (type === "Type2") {
        if (finded.type1) {
          if (finded.type2) {
            finded.type2 = false;
            if (finded.type3) {
              finded.type3 = false;
            }
          } else {
            finded.type2 = true;
            finded.type3 = true;
          }
          return {selected: [...s.selected]};
        } else {
          finded.type2 = false;
          return {selected: s.selected.filter(c => c.id !== v.id)};
        }
      }
    } else {
      if (type === "Type1") {
        if (v.type2) {
          v.type1 = true;
          v.type3 = true;
        } else {
          v.type1 = true;
        }
      } else if (type === "Type2") {
        if (v.type1) {
          v.type2 = true;
          v.type3 = true;
        } else {
          v.type2 = true;
        }
      }
  
      return {selected: [...s.selected, v]};
    }
  })),
  addMore: (v) => set(((s) => {
    const type = s.cellType;
    if (type === "Type1") {
      v.forEach(p => {p.type1 = true;})
    }
    if (type === "Type2") {
      v.forEach(p => {p.type2 = true;})
    }
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
  clear: () => set(() => ({selected: []})),
  cellType: 'Type1',
  setCellType: (v) => set(() => ({cellType: v})),
})));

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