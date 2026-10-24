"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, ShaderMaterial, type Group, type Mesh } from "three";
import { refX, refY } from "@/lib/galaxy/layout";
import { createRandom } from "@/lib/galaxy/random";
import { sceneTime, useSceneMotion } from "../motion";

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform vec3 uHead;
uniform vec3 uTail;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  float along = clamp(vUv.x, 0.0, 1.0);
  float across = abs(vUv.y - 0.5) * 2.0;
  float width = mix(0.15, 1.0, along);
  float alpha = smoothstep(width, width * 0.3, across) * pow(along, 1.6) * uOpacity;
  vec3 color = mix(uTail, uHead, smoothstep(0.7, 1.0, along));
  gl_FragColor = vec4(color, alpha);
  #include <colorspace_fragment>
}
`;

function createStreakMaterial() {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
    uniforms: {
      uHead: { value: new Color("#fff3ff") },
      uTail: { value: new Color("#c05cff") },
      uOpacity: { value: 1 },
    },
  });
}

type Meteor = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  distance: number;
  start: number;
  duration: number;
};

type ShowerProps = {
  seed: number;
  count?: number;
  area?: [number, number, number, number];
};

const DEFAULT_AREA: [number, number, number, number] = [-150, 20, 1878, 460];

export function MeteorShower({ seed, count = 7, area = DEFAULT_AREA }: ShowerProps) {
  const groups = useRef<(Group | null)[]>([]);
  const meshes = useRef<(Mesh | null)[]>([]);
  const meteors = useRef<Meteor[] | null>(null);
  const random = useRef(createRandom(seed));
  const motion = useSceneMotion();
  const material = useMemo(() => createStreakMaterial(), []);

  const spawn = (index: number, after: number, firstRun: boolean): Meteor => {
    const r = random.current;
    const angle = Math.PI + r.range(0.45, 0.85);
    const gap = firstRun ? r.range(0, 5) + index * 0.9 : r.range(1, 5);
    const mesh = meshes.current[index];
    const length = r.range(1.4, 3);
    if (mesh) {
      mesh.scale.set(length, r.range(0.035, 0.07), 1);
      mesh.position.set(-length / 2, 0, 0);
    }
    const group = groups.current[index];
    if (group) group.rotation.z = angle;
    return {
      x: refX(r.range(area[0] + 250, area[2] + 250)),
      y: refY(r.range(area[1], area[3])),
      dx: Math.cos(angle),
      dy: Math.sin(angle),
      distance: r.range(2.6, 4.8),
      start: after + gap,
      duration: r.range(2.4, 3.8),
    };
  };

  useFrame((state) => {
    if (!meteors.current) meteors.current = Array.from({ length: count }, (_, i) => spawn(i, 0, true));
    const t = sceneTime(state, motion);
    const still = motion.frozen || motion.reduced;
    meteors.current.forEach((meteor, i) => {
      const group = groups.current[i];
      if (!group) return;
      let p = still ? 0.45 : (t - meteor.start) / meteor.duration;
      if (p >= 1) {
        meteors.current![i] = spawn(i, t, false);
        p = 0;
      }
      const travel = Math.max(0, p);
      group.visible = still ? i < 3 : p > 0;
      group.position.set(meteor.x + meteor.dx * meteor.distance * travel, meteor.y + meteor.dy * meteor.distance * travel, 0);
      group.scale.setScalar(Math.max(0.0001, Math.sin(travel * Math.PI)));
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <group key={i} ref={(node) => { groups.current[i] = node; }} visible={false}>
          <mesh ref={(node) => { meshes.current[i] = node; }} material={material}>
            <planeGeometry args={[1, 1]} />
          </mesh>
        </group>
      ))}
    </>
  );
}
