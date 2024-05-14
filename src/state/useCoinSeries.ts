import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Coin = 'OREL' | '5';

export type Length = 5 | 10 | 15;

interface CoinSeriesState {
  length: Length;
  setLength: (v: Length) => void;
  seriesN: number;
  setSeriesN: (v: number) => void;
  event: Coin;
  setEvent: (v: Coin) => void;
  k: number;
  setK: (v: number) => void;
}



export const useCoinSeries = create<CoinSeriesState>()(subscribeWithSelector(set => ({
  length: 5,
  setLength: (v) => set(() => ({length: v})),
  seriesN: 2,
  setSeriesN: (v) => set(() => ({seriesN: v})),
  event: "5",
  setEvent: (v) => set(() => ({event: v})),
  k: 1,
  setK: (v) => set(() => ({k: v})),
})));