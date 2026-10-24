"use client";

import { useRef } from "react";
import type { Group } from "three";
import { refSize, refX, refY } from "@/lib/galaxy/layout";
import Glow from "../props/Glow";
import Layer from "../props/Layer";
import Monolith from "../props/Monolith";
import Orb from "../props/Orb";
import Rocks from "../props/Rocks";
import Silhouette from "../props/Silhouette";
import Starfield from "../props/Starfield";
import { useFade } from "../props/useFade";

const STAR_COLORS = ["#ffffff", "#8fd8ff", "#c6b4ff"];
const ROCK_AREA: [number, number, number, number] = [-12, -1.2, 12, 3.6];
const ROCK_SIZE: [number, number] = [0.1, 0.38];

const MONOLITHS = [
  { x: 1010, base: -3.2, width: 1.25, height: 9.6, tilt: 0.02 },
  { x: 1185, base: -3, width: 0.9, height: 7.6, tilt: -0.04 },
  { x: 330, base: -3.6, width: 1.4, height: 7, tilt: 0.06 },
  { x: 120, base: -3.4, width: 1.1, height: 5.6, tilt: 0.14 },
  { x: 520, base: -2.6, width: 0.7, height: 4.4, tilt: -0.22 },
  { x: 1545, base: -3.4, width: 1.6, height: 7.8, tilt: 0.12 },
  { x: 1690, base: -3.2, width: 1.2, height: 8.4, tilt: -0.08 },
];

export default function ProjectsEnvironment({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);
  useFade(ref, active);

  return (
    <group ref={ref}>
      <Layer z={-100} parallax={0.12}>
        <Starfield seed={5} count={380} colors={STAR_COLORS} minSize={1} maxSize={3} opacity={0.8} />
        <Glow position={[0, refY(560), 0]} size={[30, 7]} color="#1f6f8c" opacity={0.55} falloff={1.6} />
      </Layer>
      <Layer z={-80} parallax={0.15}>
        <Orb position={[refX(592), refY(382), 0]} radius={refSize(160)} color="#2c4f72" shade="#1b2d50" limb="#4a7a99" opacity={0.6} seed={2} />
        <Orb position={[refX(905), refY(470), 0]} radius={refSize(230)} color="#21405e" shade="#162a48" limb="#386a88" opacity={0.5} seed={9} />
      </Layer>
      <Layer z={-55} parallax={0.25}>
        <Silhouette seed={71} from={-16} to={16} base={refY(720)} minHeight={1} maxHeight={4.2} count={12} flatTop color="#0d1530" topColor="#1a2a4e" />
        <Glow position={[0, refY(545), 0.5]} size={[26, 0.9]} color="#8a5cff" opacity={0.5} falloff={1.5} />
      </Layer>
      <Layer z={-34} parallax={0.32}>
        {MONOLITHS.map((item) => (
          <Monolith key={item.x} position={[refX(item.x), item.base, 0]} width={item.width} height={item.height} tilt={item.tilt} />
        ))}
        <Rocks seed={17} count={42} area={ROCK_AREA} size={ROCK_SIZE} color="#06050d" emissive="#120c2c" emissiveIntensity={0.4} />
      </Layer>
      <Layer z={-10} parallax={0.45}>
        <Silhouette seed={88} from={-18} to={18} base={refY(860)} minHeight={0.2} maxHeight={1.1} count={10} flatTop color="#0b1028" topColor="#18234a" />
      </Layer>
      <Layer z={-4} parallax={0.55}>
        <group rotation={[0, 0, Math.PI]}>
          <Silhouette seed={95} from={-18} to={18} base={-refY(172)} bottom={-12} minHeight={0.05} maxHeight={0.55} count={18} flatTop color="#060607" topColor="#0b0b0e" />
        </group>
      </Layer>
    </group>
  );
}
