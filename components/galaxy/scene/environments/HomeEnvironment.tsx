"use client";

import { useRef } from "react";
import type { Group } from "three";
import { refSize, refX, refY } from "@/lib/galaxy/layout";
import Comet from "../props/Comet";
import Layer from "../props/Layer";
import Orb from "../props/Orb";
import Shard from "../props/Shard";
import { MeteorShower } from "../props/ShootingStars";
import Silhouette from "../props/Silhouette";
import Starfield from "../props/Starfield";
import { useFade } from "../props/useFade";

const STAR_COLORS = ["#3ad0c8", "#6fe6ff", "#ffffff", "#b48cff", "#3ad0c8"];

export default function HomeEnvironment({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);
  useFade(ref, active);

  return (
    <group ref={ref}>
      <Layer z={-90} parallax={0.15}>
        <Starfield seed={11} count={320} colors={STAR_COLORS} minSize={1.5} maxSize={4.5} />
        <Orb
          position={[refX(228), refY(168), 0]}
          radius={refSize(185)}
          color="#4a3285"
          shade="#2e1a5c"
          limb="#6a4fae"
          opacity={0.88}
          speck="#2a1650"
          speckAmount={0.55}
          bands={0.45}
          seed={3}
        />
        <Orb
          position={[refX(1475), refY(398), 0]}
          radius={refSize(96)}
          color="#3b1f7a"
          shade="#2a1260"
          limb="#5b3aa0"
          opacity={0.45}
          seed={7}
        />
      </Layer>
      <Layer z={-80} parallax={0.15}>
        <Comet head={[refX(78), refY(322)]} tail={[refX(440), refY(58)]} />
      </Layer>
      <Layer z={-70} parallax={0.15}>
        <MeteorShower seed={71} />
      </Layer>
      <Layer z={-50} parallax={0.25}>
        <Silhouette seed={21} from={-16} to={16} base={refY(640)} minHeight={0.4} maxHeight={2.6} count={34} color="#211a5e" topColor="#352a88" />
      </Layer>
      <Layer z={-30} parallax={0.35}>
        <Silhouette seed={34} from={-16} to={16} base={refY(760)} minHeight={0.3} maxHeight={2.3} count={24} color="#17124c" topColor="#28206e" />
      </Layer>
      <Layer z={-16} parallax={0.45}>
        <Silhouette seed={52} from={refX(1590)} to={18} base={-5} minHeight={7.4} maxHeight={10} count={2} flatTop color="#100c3a" topColor="#231968" />
        <Silhouette seed={57} from={-18} to={refX(160)} base={-2.6} minHeight={0.8} maxHeight={3.4} count={3} color="#120c40" topColor="#1f1660" />
        <Shard position={[refX(1650), refY(492), 0]} size={0.5} rotation={-0.25} phase={0.3} />
        <Shard position={[refX(1588), refY(818), 0]} size={0.42} rotation={1.25} phase={1.2} />
        <Shard position={[refX(262), refY(735), 0]} size={0.36} rotation={0.25} phase={2.1} />
        <Shard position={[refX(408), refY(770), 0]} size={0.36} rotation={-0.1} phase={2.9} />
        <Shard position={[refX(66), refY(905), 0]} size={0.4} rotation={-0.35} phase={0.7} />
      </Layer>
      <Layer z={-8} parallax={0.5}>
        <Silhouette seed={63} from={-18} to={18} base={refY(940)} minHeight={0.1} maxHeight={0.5} count={14} color="#0b0726" topColor="#140c38" />
      </Layer>
    </group>
  );
}
