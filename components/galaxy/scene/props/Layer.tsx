"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { depthScale } from "@/lib/galaxy/layout";
import { dampTo, useSceneMotion } from "../motion";

type LayerProps = {
  z: number;
  parallax?: number;
  children: ReactNode;
};

export default function Layer({ z, parallax = 0.25, children }: LayerProps) {
  const ref = useRef<Group>(null);
  const motion = useSceneMotion();
  const scale = depthScale(z);
  const strength = parallax * Math.min(1, Math.abs(z) / 60 + 0.2);

  useFrame((state, delta) => {
    const group = ref.current;
    if (!group) return;
    const targetX = -state.pointer.x * strength;
    const targetY = -state.pointer.y * strength * 0.5;
    group.position.x = dampTo(group.position.x, targetX, 2.5, delta, motion);
    group.position.y = dampTo(group.position.y, targetY, 2.5, delta, motion);
  });

  return (
    <group ref={ref}>
      <group position={[0, 0, z]} scale={[scale, scale, scale]}>
        {children}
      </group>
    </group>
  );
}
