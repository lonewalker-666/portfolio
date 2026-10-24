"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { DodecahedronGeometry, Euler, Matrix4, Quaternion, Vector3, type InstancedMesh } from "three";
import { createRandom } from "@/lib/galaxy/random";
import { sceneTime, useSceneMotion } from "../motion";

type RockProps = {
  seed: number;
  count: number;
  area: [x0: number, y0: number, x1: number, y1: number];
  size: [min: number, max: number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  stretch?: [number, number, number];
  depth?: number;
  spin?: number;
  roughness?: number;
};

export default function Rocks({
  seed,
  count,
  area,
  size,
  color,
  emissive = "#000000",
  emissiveIntensity = 0,
  stretch = [1, 1, 1],
  depth = 1.5,
  spin = 0.15,
  roughness = 0.7,
}: RockProps) {
  const ref = useRef<InstancedMesh>(null);
  const motion = useSceneMotion();
  const geometry = useMemo(() => new DodecahedronGeometry(1, 0), []);
  const items = useMemo(() => {
    const random = createRandom(seed);
    return Array.from({ length: count }, () => ({
      position: new Vector3(random.range(area[0], area[2]), random.range(area[1], area[3]), random.range(-depth, depth)),
      rotation: new Euler(random.range(0, Math.PI), random.range(0, Math.PI), random.range(0, Math.PI)),
      scale: random.range(size[0], size[1]),
      squash: new Vector3(stretch[0] * random.range(0.7, 1.3), stretch[1] * random.range(0.6, 1.2), stretch[2]),
      speed: random.range(-1, 1),
      phase: random.range(0, Math.PI * 2),
    }));
  }, [seed, count, area, size, stretch, depth]);

  const matrix = useMemo(() => new Matrix4(), []);
  const quaternion = useMemo(() => new Quaternion(), []);
  const euler = useMemo(() => new Euler(), []);
  const position = useMemo(() => new Vector3(), []);
  const scale = useMemo(() => new Vector3(), []);

  const write = (t: number) => {
    const mesh = ref.current;
    if (!mesh) return;
    items.forEach((item, i) => {
      euler.set(item.rotation.x + t * spin * item.speed, item.rotation.y + t * spin * 0.7 * item.speed, item.rotation.z);
      quaternion.setFromEuler(euler);
      position.copy(item.position);
      position.y += Math.sin(t * 0.6 + item.phase) * 0.06;
      scale.copy(item.squash).multiplyScalar(item.scale);
      matrix.compose(position, quaternion, scale);
      mesh.setMatrixAt(i, matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useLayoutEffect(() => write(0));

  useFrame((state) => {
    if (motion.frozen || motion.reduced) return;
    write(sceneTime(state, motion));
  });

  return (
    <instancedMesh ref={ref} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
        flatShading
      />
    </instancedMesh>
  );
}
