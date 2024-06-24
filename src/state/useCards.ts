import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type CardsType = 1|2|3|4|5;

interface CardsLyaout1State {
  drop1Card: CardsType | null;
  drop1PrevCard: CardsType | null;
  drop1Value: number;
  setDrop1Card: (c: CardsType) => void;
  setDrop1Value: (v: number) => void;
}

export const useCardsLyaout1 = create<CardsLyaout1State>()(subscribeWithSelector(set => ({
  drop1Card: null,
  drop1PrevCard: null,
  drop1Value: 0,
  setDrop1Card: (c) => set((s) => ({drop1Card: c, drop1PrevCard: s.drop1Card})),
  setDrop1Value: (v) => set(() => ({drop1Value: v})),
})));