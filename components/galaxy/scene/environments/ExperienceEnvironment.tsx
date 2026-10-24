"use client";

import { useRef } from "react";
import type { Group } from "three";
import { refSize, refX, refY } from "@/lib/galaxy/layout";
import Glow from "../props/Glow";
import LavaPool from "../props/LavaPool";
import Layer from "../props/Layer";
import Orb from "../props/Orb";
import Rocks from "../props/Rocks";
import Silhouette from "../props/Silhouette";
import Starfield from "../props/Starfield";
import { useFade } from "../props/useFade";

const STAR_COLORS = ["#3ad0c8", "#8fe8ff", "#ffffff"];
const SLAB_AREA: [number, number, number, number] = [-11, 0.2, 11, 4.2];
const SLAB_SIZE: [number, number] = [0.16, 0.5];
const SLAB_STRETCH: [number, number, number] = [1.7, 0.42, 1.2];
const PEBBLE_AREA: [number, number, number, number] = [-9, -0.5, 9, 4];
const PEBBLE_SIZE: [number, number] = [0.04, 0.12];

export default function ExperienceEnvironment({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);
  useFade(ref, active);

  return (
    <group ref={ref}>
      <Layer z={-100} parallax={0.12}>
        <Starfield seed={23} count={260} colors={STAR_COLORS} minSize={1.5} maxSize={4} />
        <Glow position={[refX(1050), refY(520), 0]} size={6.5} color="#b9bfbb" opacity={0.5} core={0.26} falloff={2.2} />
      </Layer>
      <Layer z={-85} parallax={0.15}>
        <Orb position={[refX(150), refY(150), 0]} radius={refSize(235)} color="#3a2a7c" shade="#1f1552" limb="#5b4cb4" speck="#281c62" speckAmount={0.45} bands={0.4} seed={4} />
        <Orb position={[refX(1690), refY(190), 0]} radius={refSize(100)} color="#3b3b8c" shade="#22225a" limb="#6c7ad0" speck="#2a2a6a" speckAmount={0.4} seed={8} />
      </Layer>
      <Layer z={-60} parallax={0.25}>
        <Silhouette seed={131} from={-16} to={16} base={refY(660)} minHeight={0.8} maxHeight={3} count={10} flatTop color="#34246f" topColor="#55409e" />
      </Layer>
      <Layer z={-36} parallax={0.32}>
        <Rocks seed={29} count={32} area={SLAB_AREA} size={SLAB_SIZE} stretch={SLAB_STRETCH} color="#4b3392" emissive="#2a1a5a" emissiveIntensity={0.45} roughness={0.9} />
        <Rocks seed={31} count={40} area={PEBBLE_AREA} size={PEBBLE_SIZE} color="#1c1240" />
      </Layer>
      <Layer z={-22} parallax={0.4}>
        <Silhouette seed={141} from={-18} to={refX(330)} base={-2.2} minHeight={1.6} maxHeight={5.4} count={3} flatTop color="#2b1a62" topColor="#4d36a0" />
        <Silhouette seed={147} from={refX(1230)} to={18} base={-2} minHeight={1.4} maxHeight={3.8} count={4} flatTop color="#2b1a62" topColor="#4a339a" />
      </Layer>
      <Layer z={-10} parallax={0.5}>
        <Silhouette seed={151} from={-18} to={18} base={refY(880)} minHeight={0.1} maxHeight={0.6} count={12} color="#1c1046" topColor="#2d1a63" />
        <LavaPool position={[refX(125), refY(842), 0.1]} size={[1.0, 1.45]} rotation={0.15} />
        <LavaPool position={[refX(1590), refY(800), 0.1]} size={[1.15, 0.55]} phase={1} />
        <LavaPool position={[refX(305), refY(806), 0.1]} size={[0.9, 0.12]} phase={2} />
        <LavaPool position={[refX(205), refY(968), 0.1]} size={[0.65, 0.1]} phase={3} />
        <LavaPool position={[refX(1700), refY(975), 0.1]} size={[0.9, 0.13]} phase={4} />
        <LavaPool position={[refX(60), refY(890), 0.1]} size={[0.5, 0.18]} phase={5} />
      </Layer>
    </group>
  );
}
