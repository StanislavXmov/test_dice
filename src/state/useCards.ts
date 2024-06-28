import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type CardsType = 1|2|3|4|5;

interface CardsLyaout1State {
  drop1Card: CardsType | null;
  drop1PrevCard: CardsType | null;
  drop1Values: CardsType[];
  drop1IsActive: boolean;
  setDrop1Card: (c: CardsType) => void;
  setDrop1Values: (c: CardsType) => void;
  setDrop1IsActive: (v: boolean) => void;
  drop2Card: CardsType | null;
  drop2PrevCard: CardsType | null;
  drop2Values: CardsType[];
  drop2IsActive: boolean;
  setDrop2Card: (c: CardsType) => void;
  setDrop2Values: (c: CardsType) => void;
  setDrop2IsActive: (v: boolean) => void;
  drop3Card: CardsType | null;
  drop3PrevCard: CardsType | null;
  drop3Values: CardsType[];
  drop3IsActive: boolean;
  setDrop3Card: (c: CardsType) => void;
  setDrop3Values: (c: CardsType) => void;
  setDrop3IsActive: (v: boolean) => void;
  reset: () => void;
}

export const useCardsLyaout1 = create<CardsLyaout1State>()(subscribeWithSelector(set => ({
  drop1Card: null,
  drop1PrevCard: null,
  drop1IsActive: true,
  drop1Values: [],
  setDrop1Card: (c) => set((s) => {
    const values = [...s.drop1Values, c];
    if (values.length === 5) {
      return {
        drop1Card: c,
        drop1PrevCard: s.drop1Card,
        drop1Values: values,
        drop1IsActive: false,
        drop2IsActive: true,
      };
    } else {
      return {drop1Card: c, drop1PrevCard: s.drop1Card, drop1Values: values};
    }
  }),
  setDrop1Values: (c) => set((s) => ({drop1Values: [...s.drop1Values, c]})),
  setDrop1IsActive: (v) => set(() => ({drop1IsActive: v})),
  drop2Card: null,
  drop2PrevCard: null,
  drop2IsActive: false,
  drop2Values: [],
  setDrop2Card: (c) => set((s) => {
    const values = [...s.drop2Values, c];
    if (values.length === 5) {
      return {
        drop2Card: c,
        drop2PrevCard: s.drop2Card,
        drop2Values: values,
        drop2IsActive: false,
        drop3IsActive: true,
      };
    } else {
      return {drop2Card: c, drop2PrevCard: s.drop2Card, drop2Values: values};
    }
  }),
  setDrop2Values: (c) => set((s) => ({drop2Values: [...s.drop2Values, c]})),
  setDrop2IsActive: (v) => set(() => ({drop2IsActive: v})),
  drop3Card: null,
  drop3PrevCard: null,
  drop3IsActive: false,
  drop3Values: [],
  setDrop3Card: (c) => set((s) => {
    const values = [...s.drop3Values, c];
    if (values.length === 5) {
      return {
        drop3Card: c,
        drop3PrevCard: s.drop3Card,
        drop3Values: values,
        drop3IsActive: false,
      };
    } else {
      return {drop3Card: c, drop3PrevCard: s.drop3Card, drop3Values: values};
    }
  }),
  setDrop3Values: (c) => set((s) => ({drop3Values: [...s.drop3Values, c]})),
  setDrop3IsActive: (v) => set(() => ({drop3IsActive: v})),
  reset: () => set(() => ({
    drop1Card: null,
    drop1PrevCard: null,
    drop1IsActive: true,
    drop1Values: [],
    drop2Card: null,
    drop2PrevCard: null,
    drop2IsActive: false,
    drop2Values: [],
    drop3Card: null,
    drop3PrevCard: null,
    drop3IsActive: false,
    drop3Values: [],
  })),
})));

export const useCardsLyaout3 = create<CardsLyaout1State>()(subscribeWithSelector(set => ({
  drop1Card: null,
  drop1PrevCard: null,
  drop1IsActive: true,
  drop1Values: [],
  setDrop1Card: (c) => set((s) => {
    const values = [...s.drop1Values, c];
    if (values.length === 5) {
      return {
        drop1Card: c,
        drop1PrevCard: s.drop1Card,
        drop1Values: values,
        drop1IsActive: false,
        drop2IsActive: true,
      };
    } else {
      return {drop1Card: c, drop1PrevCard: s.drop1Card, drop1Values: values};
    }
  }),
  setDrop1Values: (c) => set((s) => ({drop1Values: [...s.drop1Values, c]})),
  setDrop1IsActive: (v) => set(() => ({drop1IsActive: v})),
  drop2Card: null,
  drop2PrevCard: null,
  drop2IsActive: false,
  drop2Values: [],
  setDrop2Card: (c) => set((s) => {
    const values = [...s.drop2Values, c];
    if (values.length === 5) {
      return {
        drop2Card: c,
        drop2PrevCard: s.drop2Card,
        drop2Values: values,
        drop2IsActive: false,
        drop3IsActive: true,
      };
    } else {
      return {drop2Card: c, drop2PrevCard: s.drop2Card, drop2Values: values};
    }
  }),
  setDrop2Values: (c) => set((s) => ({drop2Values: [...s.drop2Values, c]})),
  setDrop2IsActive: (v) => set(() => ({drop2IsActive: v})),
  drop3Card: null,
  drop3PrevCard: null,
  drop3IsActive: false,
  drop3Values: [],
  setDrop3Card: (c) => set((s) => {
    const values = [...s.drop3Values, c];
    if (values.length === 5) {
      return {
        drop3Card: c,
        drop3PrevCard: s.drop3Card,
        drop3Values: values,
        drop3IsActive: false,
      };
    } else {
      return {drop3Card: c, drop3PrevCard: s.drop3Card, drop3Values: values};
    }
  }),
  setDrop3Values: (c) => set((s) => ({drop3Values: [...s.drop3Values, c]})),
  setDrop3IsActive: (v) => set(() => ({drop3IsActive: v})),
  reset: () => set(() => ({
    drop1Card: null,
    drop1PrevCard: null,
    drop1IsActive: true,
    drop1Values: [],
    drop2Card: null,
    drop2PrevCard: null,
    drop2IsActive: false,
    drop2Values: [],
    drop3Card: null,
    drop3PrevCard: null,
    drop3IsActive: false,
    drop3Values: [],
  })),
})));

export const useCardsLyaout4 = create<CardsLyaout1State>()(subscribeWithSelector(set => ({
  drop1Card: null,
  drop1PrevCard: null,
  drop1IsActive: true,
  drop1Values: [],
  setDrop1Card: (c) => set((s) => {
    const values = [...s.drop1Values, c];
    if (values.length === 5) {
      return {
        drop1Card: c,
        drop1PrevCard: s.drop1Card,
        drop1Values: values,
        drop1IsActive: false,
        drop2IsActive: true,
      };
    } else {
      return {drop1Card: c, drop1PrevCard: s.drop1Card, drop1Values: values};
    }
  }),
  setDrop1Values: (c) => set((s) => ({drop1Values: [...s.drop1Values, c]})),
  setDrop1IsActive: (v) => set(() => ({drop1IsActive: v})),
  drop2Card: null,
  drop2PrevCard: null,
  drop2IsActive: false,
  drop2Values: [],
  setDrop2Card: (c) => set((s) => {
    const values = [...s.drop2Values, c];
    if (values.length === 5) {
      return {
        drop2Card: c,
        drop2PrevCard: s.drop2Card,
        drop2Values: values,
        drop2IsActive: false,
        drop3IsActive: true,
      };
    } else {
      return {drop2Card: c, drop2PrevCard: s.drop2Card, drop2Values: values};
    }
  }),
  setDrop2Values: (c) => set((s) => ({drop2Values: [...s.drop2Values, c]})),
  setDrop2IsActive: (v) => set(() => ({drop2IsActive: v})),
  drop3Card: null,
  drop3PrevCard: null,
  drop3IsActive: false,
  drop3Values: [],
  setDrop3Card: (c) => set((s) => {
    const values = [...s.drop3Values, c];
    if (values.length === 5) {
      return {
        drop3Card: c,
        drop3PrevCard: s.drop3Card,
        drop3Values: values,
        drop3IsActive: false,
      };
    } else {
      return {drop3Card: c, drop3PrevCard: s.drop3Card, drop3Values: values};
    }
  }),
  setDrop3Values: (c) => set((s) => ({drop3Values: [...s.drop3Values, c]})),
  setDrop3IsActive: (v) => set(() => ({drop3IsActive: v})),
  reset: () => set(() => ({
    drop1Card: null,
    drop1PrevCard: null,
    drop1IsActive: true,
    drop1Values: [],
    drop2Card: null,
    drop2PrevCard: null,
    drop2IsActive: false,
    drop2Values: [],
    drop3Card: null,
    drop3PrevCard: null,
    drop3IsActive: false,
    drop3Values: [],
  })),
})));