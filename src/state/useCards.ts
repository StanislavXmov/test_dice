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
}

export const useCardsLyaout1 = create<CardsLyaout1State>()(subscribeWithSelector(set => ({
  drop1Card: null,
  drop1PrevCard: null,
  drop1IsActive: true,
  drop1Values: [],
  setDrop1Card: (c) => set((s) => ({drop1Card: c, drop1PrevCard: s.drop1Card, drop1Values: [...s.drop1Values, c]})),
  setDrop1Values: (c) => set((s) => ({drop1Values: [...s.drop1Values, c]})),
  setDrop1IsActive: (v) => set(() => ({drop1IsActive: v})),
})));