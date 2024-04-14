import { Vector3 } from "three";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface PositionState {
  position: Vector3;
  setPosition: (v: Vector3) => void;
}

export const useCoinPosition = create<PositionState>()(subscribeWithSelector(set => ({
  position: new Vector3(0, 7, 0),
  setPosition: (v) => set((() => ({position: v}))),
})));