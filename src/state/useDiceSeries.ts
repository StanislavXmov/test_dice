import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";


export type Edge = 6 | 8 | 12;
export type Length = 5 | 10 | 15;

export type EventDice = '=' | '>' | '<';

interface DiceSeriesState {
  edge: Edge;
  setEdge: (v: Edge) => void;
  series: number[][];
  setSeries: (v: number[][]) => void;
  length: Length;
  setLength: (v: Length) => void;
  seriesN: number;
  setSeriesN: (v: number) => void;
  event: EventDice;
  setEvent: (v: EventDice) => void;
  k: number;
  setK: (v: number) => void;
}



export const useDiceSeries = create<DiceSeriesState>()(subscribeWithSelector(set => ({
  edge: 6,
  setEdge: (v) => set(() => ({edge: v})),
  series: [],
  // setSeries: (v) => set((s) => ({series: [...s.series, ...v]})),
  setSeries: (v) => set((s) => ({series: [...v]})),
  length: 5,
  setLength: (v) => set(() => ({length: v})),
  seriesN: 2,
  setSeriesN: (v) => set(() => ({seriesN: v})),
  event: "=",
  setEvent: (v) => set(() => ({event: v})),
  k: 1,
  setK: (v) => set(() => ({k: v})),
})));