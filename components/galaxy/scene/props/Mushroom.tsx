"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { LatheGeometry, Matrix4, Quaternion, Vector2, Vector3, Euler, type Group, type InstancedMesh } from "three";
import { createRandom } from "@/lib/galaxy/random";
import { sceneTime, useSceneMotion } from "../motion";

type MushroomProps = {
  position: [number, number, number];
  scale?: number;
  height?: number;
  tilt?: number;
  seed?: number;
  cap?: string;
  capShade?: string;
  stem?: string;
  light?: string;
};

function capProfile() {
  const points: Vector2[] = [];
  for (let i = 0; i <= 16; i += 1) {
    const t = i / 16;
    const angle = t * Math.PI * 0.5;
    points.push(new Vector2(Math.sin(angle) * (1 - 0.15 * t * t), Math.cos(angle) * 1.25));
  }
  points.push(new Vector2(1.08, -0.06));
  points.push(new Vector2(0.9, -0.16));
  points.push(new Vector2(0.15, -0.12));
  return points;
}

export default function Mushroom({
  position,
  scale = 1,
  height = 2.4,
  tilt = 0,
  seed = 1,
  cap = "#3b3150",
  capShade = "#241c33",
  stem = "#2a2236",
  light = "#e8e23a",
}: MushroomProps) {
  const group = useRef<Group>(null);
  const lights = useRef<InstancedMesh>(null);
  const motion = useSceneMotion();
  const capGeometry = useMemo(() => new LatheGeometry(capProfile(), 48), []);

  const dashes = useMemo(() => {
    const random = createRandom(seed);
    const list: { angle: number; y: number; ring: number; length: number }[] = [];
    const rings = [
      { y: 0.25, r: 0.99 },
      { y: 0.62, r: 0.86 },
      { y: 0.95, r: 0.62 },
    ];
    rings.forEach((ring, ringIndex) => {
      const count = 12 - ringIndex * 3;
      for (let i = 0; i < count; i += 1) {
        if (random.next() < 0.25) continue;
        list.push({ angle: (i / count) * Math.PI * 2 + random.range(0, 0.2), y: ring.y, ring: ring.r, length: random.range(0.12, 0.3) });
      }
    });
    return list;
  }, [seed]);

  useLayoutEffect(() => {
    const mesh = lights.current;
    if (!mesh) return;
    const matrix = new Matrix4();
    const quaternion = new Quaternion();
    dashes.forEach((dash, i) => {
      const x = Math.sin(dash.angle) * dash.ring;
      const z = Math.cos(dash.angle) * dash.ring;
      quaternion.setFromEuler(new Euler(0, dash.angle, 0));
      matrix.compose(new Vector3(x, dash.y, z), quaternion, new Vector3(dash.length, 0.035, 0.03));
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [dashes]);

  useFrame((state) => {
    const node = group.current;
    if (!node) return;
    const t = sceneTime(state, motion);
    node.rotation.y = t * 0.05 + seed;
  });

  return (
    <group position={position} scale={scale} rotation={[0, 0, tilt]}>
      <mesh position={[0, height / 2 - 0.2, 0]}>
        <cylinderGeometry args={[0.08, 0.16, height, 12]} />
        <meshStandardMaterial color={stem} roughness={0.8} />
      </mesh>
      <group ref={group} position={[0, height, 0]}>
        <mesh geometry={capGeometry}>
          <meshStandardMaterial color={cap} emissive={capShade} emissiveIntensity={0.4} roughness={0.6} flatShading />
        </mesh>
        <instancedMesh ref={lights} args={[undefined, undefined, dashes.length]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={light} toneMapped={false} />
        </instancedMesh>
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.025, 6, 48]} />
          <meshBasicMaterial color={light} toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
