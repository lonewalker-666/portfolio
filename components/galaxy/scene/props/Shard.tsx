"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { sceneTime, useSceneMotion } from "../motion";
import Glow from "./Glow";

type ShardProps = {
  position: [number, number, number];
  size: number;
  rotation?: number;
  color?: string;
  glow?: string;
  phase?: number;
};

export default function Shard({
  position,
  size,
  rotation = 0,
  color = "#c9a3c4",
  glow = "#ff3d9a",
  phase = 0,
}: ShardProps) {
  const ref = useRef<Group>(null);
  const motion = useSceneMotion();

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const t = sceneTime(state, motion);
    group.position.y = position[1] + Math.sin(t * 0.8 + phase) * 0.06;
    group.rotation.z = rotation + Math.sin(t * 0.5 + phase) * 0.08;
  });

  return (
    <group ref={ref} position={position} rotation={[0, 0, rotation]}>
      <Glow position={[0, 0.05, -0.05]} size={size * 2.6} color={glow} opacity={0.55} falloff={2.4} />
      <mesh scale={[size, size * 0.42, size * 0.5]}>
        <sphereGeometry args={[1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh scale={[size * 0.98, size * 0.12, size * 0.5]} position={[0, 0.02, 0.01]}>
        <sphereGeometry args={[1, 24, 8]} />
        <meshBasicMaterial color="#ff6fb7" toneMapped={false} />
      </mesh>
    </group>
  );
}
