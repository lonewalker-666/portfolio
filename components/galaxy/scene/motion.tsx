"use client";

import { createContext, useContext } from "react";
import type { RootState } from "@react-three/fiber";

export type SceneMotion = {
  reduced: boolean;
  frozen: boolean;
};

export const SceneMotionContext = createContext<SceneMotion>({ reduced: false, frozen: false });

export function useSceneMotion() {
  return useContext(SceneMotionContext);
}

export const FROZEN_TIME = 4.2;

export function sceneTime(state: RootState, motion: SceneMotion) {
  return motion.frozen || motion.reduced ? FROZEN_TIME : state.clock.elapsedTime;
}

export function dampTo(current: number, target: number, lambda: number, delta: number, motion: SceneMotion) {
  if (motion.frozen || motion.reduced) return target;
  return current + (target - current) * (1 - Math.exp(-lambda * Math.min(delta, 0.1)));
}
