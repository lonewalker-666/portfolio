"use client";

import { useRef } from "react";
import type { Group } from "three";
import { refX, refY } from "@/lib/galaxy/layout";
import Glow from "../props/Glow";
import Layer from "../props/Layer";
import Mushroom from "../props/Mushroom";
import Silhouette from "../props/Silhouette";
import Starfield from "../props/Starfield";
import { useFade } from "../props/useFade";

const SPORE_COLORS = ["#e8e23a", "#ffffff", "#b8c48a"];

export default function SkillsEnvironment({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);
  useFade(ref, active);

  return (
    <group ref={ref}>
      <Layer z={-100} parallax={0.12}>
        <Glow position={[refX(260), refY(90), 0]} size={[16, 4]} color="#a7b38c" opacity={0.35} falloff={1.4} additive={false} />
        <Glow position={[refX(1300), refY(160), 0]} size={[18, 5]} color="#8c9b78" opacity={0.3} falloff={1.4} additive={false} />
        <Glow position={[0, refY(470), 0]} size={[30, 5]} color="#7b5a8a" opacity={0.4} falloff={1.5} additive={false} />
      </Layer>
      <Layer z={-75} parallax={0.18}>
        <Silhouette seed={101} from={-16} to={16} base={refY(520)} minHeight={0.6} maxHeight={3.6} count={8} spike={0.15} color="#4c4c62" topColor="#666f6e" />
      </Layer>
      <Layer z={-50} parallax={0.25}>
        <Silhouette seed={111} from={-16} to={16} base={refY(640)} minHeight={0.3} maxHeight={1.8} count={9} flatTop color="#3a2b52" topColor="#54446a" />
      </Layer>
      <Layer z={-32} parallax={0.32}>
        <Mushroom position={[refX(470), -3.25, 0]} scale={2.2} height={2.4} tilt={-0.08} seed={1} />
        <Mushroom position={[refX(1540), -2.5, 0]} scale={1.2} height={4} tilt={0.06} seed={2} />
        <Mushroom position={[refX(1310), -1.5, 0]} scale={0.5} height={3} tilt={-0.1} seed={3} />
        <Mushroom position={[refX(40), -2.1, 0]} scale={0.45} height={3} tilt={0.12} seed={4} />
        <Mushroom position={[refX(1680), -1.9, 1]} scale={0.6} height={2.4} tilt={-0.2} seed={5} />
        <Starfield seed={13} count={120} width={22} top={4} bottom={-3} colors={SPORE_COLORS} minSize={2} maxSize={5} opacity={0.75} />
      </Layer>
      <Layer z={-12} parallax={0.45}>
        <Silhouette seed={121} from={-18} to={18} base={refY(840)} minHeight={0.2} maxHeight={1.5} count={8} flatTop color="#2b1238" topColor="#4a2352" />
      </Layer>
    </group>
  );
}
