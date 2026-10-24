"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MeshBasicMaterial } from "three";
import { sceneTime, useSceneMotion } from "../motion";
import Glow from "./Glow";

type LavaPoolProps = {
  position: [number, number, number];
  size: [number, number];
  rotation?: number;
  phase?: number;
};

export default function LavaPool({ position, size, rotation = 0, phase = 0 }: LavaPoolProps) {
  const material = useRef<MeshBasicMaterial>(null);
  const motion = useSceneMotion();

  useFrame((state) => {
    if (!material.current) return;
    const t = sceneTime(state, motion);
    material.current.color.setRGB(1.0 + Math.sin(t * 1.3 + phase) * 0.1, 0.86, 0.02);
  });

  return (
    <group position={position} rotation={[0, 0, rotation]}>
      <Glow position={[0, 0, -0.02]} size={[size[0] * 2.4, size[1] * 2.8]} color="#ffb800" opacity={0.3} falloff={2.6} />
      <mesh scale={[size[0] / 2, size[1] / 2, 1]}>
        <circleGeometry args={[1, 40]} />
        <meshBasicMaterial ref={material} color="#ffd400" toneMapped={false} />
      </mesh>
      <mesh scale={[size[0] / 2.6, size[1] / 3.2, 1]} position={[size[0] * 0.08, size[1] * 0.08, 0.01]}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial color="#c7a400" />
      </mesh>
    </group>
  );
}
