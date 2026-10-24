"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { refSize, refX, refY } from "@/lib/galaxy/layout";
import { sceneTime, useSceneMotion } from "../motion";
import Glow from "../props/Glow";
import Layer from "../props/Layer";
import Orb from "../props/Orb";
import Rocks from "../props/Rocks";
import Shard from "../props/Shard";
import { MeteorShower } from "../props/ShootingStars";
import Silhouette from "../props/Silhouette";
import Starfield from "../props/Starfield";
import { useFade } from "../props/useFade";

const STAR_COLORS = ["#ffffff", "#ff8fd8", "#8fe8ff", "#c6b4ff"];
const CRYSTAL_AREA: [number, number, number, number] = [-11, 0.4, 11, 4.2];
const CRYSTAL_SIZE: [number, number] = [0.08, 0.26];
const CRYSTAL_STRETCH: [number, number, number] = [0.6, 1.6, 0.6];

function RingedPlanet() {
  const ring = useRef<Group>(null);
  const motion = useSceneMotion();
  const radius = refSize(170);

  useFrame((state) => {
    if (ring.current) ring.current.rotation.z = -0.35 + Math.sin(sceneTime(state, motion) * 0.2) * 0.03;
  });

  return (
    <group position={[refX(1420), refY(250), 0]}>
      <Orb position={[0, 0, 0]} radius={radius} color="#b0478f" shade="#4a1660" limb="#ff8fd0" speck="#3a1050" speckAmount={0.3} bands={0.6} seed={12} />
      <group ref={ring} rotation={[1.25, 0, -0.35]}>
        <mesh>
          <torusGeometry args={[radius * 1.65, radius * 0.06, 2, 96]} />
          <meshBasicMaterial color="#f2b6ff" transparent opacity={0.75} />
        </mesh>
        <mesh>
          <torusGeometry args={[radius * 1.4, radius * 0.1, 2, 96]} />
          <meshBasicMaterial color="#a45cd6" transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
}

export default function AboutEnvironment({ active }: { active: boolean }) {
  const ref = useRef<Group>(null);
  useFade(ref, active);

  return (
    <group ref={ref}>
      <Layer z={-100} parallax={0.12}>
        <Glow position={[refX(380), refY(260), 0]} size={[16, 7]} color="#c0389a" opacity={0.35} falloff={1.6} rotation={0.3} />
        <Glow position={[refX(1250), refY(520), 0]} size={[18, 6]} color="#2a8cc8" opacity={0.3} falloff={1.6} rotation={-0.2} />
        <Starfield seed={41} count={360} colors={STAR_COLORS} minSize={1.2} maxSize={4} />
      </Layer>
      <Layer z={-85} parallax={0.15}>
        <RingedPlanet />
        <Orb position={[refX(250), refY(560), 0]} radius={refSize(70)} color="#3a5cb0" shade="#1c2860" limb="#7fb0ff" opacity={0.7} seed={14} />
      </Layer>
      <Layer z={-70} parallax={0.15}>
        <MeteorShower seed={83} />
      </Layer>
      <Layer z={-50} parallax={0.25}>
        <Silhouette seed={161} from={-16} to={16} base={refY(680)} minHeight={0.3} maxHeight={1.8} count={18} color="#1f1458" topColor="#3a2380" />
      </Layer>
      <Layer z={-34} parallax={0.32}>
        <Rocks seed={43} count={30} area={CRYSTAL_AREA} size={CRYSTAL_SIZE} stretch={CRYSTAL_STRETCH} color="#6a3cc8" emissive="#3a1a8a" emissiveIntensity={0.6} roughness={0.4} />
      </Layer>
      <Layer z={-16} parallax={0.45}>
        <Silhouette seed={171} from={-18} to={refX(260)} base={-2.4} minHeight={0.8} maxHeight={3} count={3} color="#140c40" topColor="#24166a" />
        <Silhouette seed={177} from={refX(1480)} to={18} base={-2.6} minHeight={1} maxHeight={3.6} count={3} color="#140c40" topColor="#24166a" />
        <Shard position={[refX(150), refY(640), 0]} size={0.4} rotation={0.4} color="#a8c8ff" glow="#3aa0ff" phase={0.4} />
        <Shard position={[refX(1610), refY(700), 0]} size={0.45} rotation={-0.5} color="#a8c8ff" glow="#3aa0ff" phase={1.6} />
        <Shard position={[refX(330), refY(860), 0]} size={0.32} rotation={-0.2} phase={2.4} />
      </Layer>
      <Layer z={-8} parallax={0.5}>
        <Silhouette seed={181} from={-18} to={18} base={refY(930)} minHeight={0.1} maxHeight={0.5} count={14} color="#0a0626" topColor="#150c3a" />
      </Layer>
    </group>
  );
}
