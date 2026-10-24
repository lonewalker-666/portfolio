"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, NormalBlending, BufferGeometry, Color, ShaderMaterial, type Group, type Mesh, type Points } from "three";
import { createRandom } from "@/lib/galaxy/random";
import { sceneTime, useSceneMotion } from "../motion";
import { simplexNoise3D } from "../shaders/noise";

const planeVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const tailFragment = /* glsl */ `
${simplexNoise3D}
uniform float uTime;
uniform float uOpacity;
uniform float uLife;
uniform vec3 uCore;
uniform vec3 uMid;
uniform vec3 uEdge;
varying vec2 vUv;
void main() {
  float along = clamp(vUv.x, 0.0, 1.0);
  float across = (vUv.y - 0.5) * 2.0;
  float sway = (sin(along * 8.0 - uTime * 0.9) * 0.06 + snoise(vec3(along * 3.0, uTime * 0.15, 1.7)) * 0.08) * along;
  float y = across - sway;
  float spread = mix(0.95, 0.3, pow(along, 0.7));
  float ragged = 1.0 + snoise(vec3(along * 7.0 - uTime * 0.6, y * 3.0, uTime * 0.2)) * 0.35;
  float core = smoothstep(spread * 0.38 * ragged, spread * 0.05, abs(y));
  float body = smoothstep(spread * ragged, spread * 0.2, abs(y));
  float filaments = 0.65 + 0.35 * sin(y * 26.0 + along * 5.0 + snoise(vec3(along * 4.0, y * 6.0, uTime * 0.25)) * 3.0);
  float flicker = 0.85 + 0.15 * snoise(vec3(along * 5.0 - uTime * 1.6, y, uTime * 0.4));
  float fade = pow(1.0 - along, 1.1) * smoothstep(0.0, 0.02, along);
  vec3 color = mix(uCore, uMid, smoothstep(0.0, 0.5, along));
  color = mix(color, uEdge, smoothstep(0.25, 1.0, abs(y) / spread));
  float alpha = clamp(core * 1.1 + body * 0.5 * filaments, 0.0, 1.0) * fade * flicker * uOpacity * uLife;
  gl_FragColor = vec4(color * alpha, alpha);
  #include <colorspace_fragment>
}
`;

const headFragment = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
uniform float uLife;
uniform vec3 uCore;
uniform vec3 uHalo;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float pulse = 1.0 + 0.08 * sin(uTime * 2.6);
  float core = smoothstep(0.16 * pulse, 0.05, d);
  float halo = pow(max(0.0, 1.0 - d), 2.8) * 0.55;
  float rays = pow(max(0.0, 1.0 - d), 3.0) * (0.5 + 0.5 * sin(atan(vUv.y - 0.5, vUv.x - 0.5 + 1e-4) * 6.0 + uTime * 0.5)) * 0.35;
  vec3 color = mix(uHalo, uCore, core);
  float alpha = clamp(core + halo + rays, 0.0, 1.0) * uOpacity * uLife;
  gl_FragColor = vec4(color * alpha, alpha);
  #include <colorspace_fragment>
}
`;

const debrisVertex = /* glsl */ `
attribute float aSeed;
attribute float aSide;
attribute float aSpeed;
attribute float aSize;
attribute vec3 aColor;
uniform float uTime;
uniform float uLength;
uniform float uWidth;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float t = fract(uTime * aSpeed + aSeed);
  vec3 p = vec3(t * uLength * 0.8, aSide * uWidth * (0.08 + t * 0.55) + sin(t * 9.0 + aSeed * 20.0) * 0.03, 0.0);
  vColor = aColor;
  vAlpha = (1.0 - t) * smoothstep(0.0, 0.06, t);
  gl_PointSize = aSize * uPixelRatio * mix(1.0, 0.5, t);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const debrisFragment = /* glsl */ `
uniform float uOpacity;
uniform float uLife;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.1, d) * vAlpha * uOpacity * uLife;
  gl_FragColor = vec4(vColor * alpha, alpha);
  #include <colorspace_fragment>
}
`;

const FALL_FROM = 7;
const FALL_TO = 5;

const DEBRIS_COLORS = ["#f2ecff", "#cfc4e8", "#5fd6d0", "#ffb8f0"];

type Pass = { start: number; duration: number; shift: number };

type CometProps = {
  head: [number, number];
  tail: [number, number];
  width?: number;
  debris?: number;
  seed?: number;
};

function streakMaterial(vertexShader: string, fragmentShader: string, uniforms: Record<string, { value: unknown }>, glow = false) {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: glow ? AdditiveBlending : NormalBlending,
    premultipliedAlpha: true,
    uniforms: { uTime: { value: 0 }, uOpacity: { value: 1 }, uLife: { value: 1 }, ...uniforms },
  });
}

export default function Comet({ head, tail, width = 0.42, debris = 70, seed = 5 }: CometProps) {
  const motion = useSceneMotion();
  const tailMesh = useRef<Mesh>(null);
  const headMesh = useRef<Mesh>(null);
  const dust = useRef<Points>(null);
  const body = useRef<Group>(null);
  const pass = useRef<Pass | null>(null);
  const random = useRef(createRandom(seed + 101));
  const dx = tail[0] - head[0];
  const dy = tail[1] - head[1];
  const length = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx);

  const { tailMaterial, headMaterial, dustMaterial, dustGeometry } = useMemo(() => {
    const random = createRandom(seed);
    const seeds = new Float32Array(debris);
    const sides = new Float32Array(debris);
    const speeds = new Float32Array(debris);
    const sizes = new Float32Array(debris);
    const tints = new Float32Array(debris * 3);
    const palette = DEBRIS_COLORS.map((value) => new Color(value));
    for (let i = 0; i < debris; i += 1) {
      seeds[i] = random.next();
      sides[i] = random.range(-1, 1);
      speeds[i] = random.range(0.05, 0.14);
      sizes[i] = random.range(2, 6.5);
      const tint = random.pick(palette);
      tints.set([tint.r, tint.g, tint.b], i * 3);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(debris * 3), 3));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));
    geometry.setAttribute("aSide", new BufferAttribute(sides, 1));
    geometry.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geometry.setAttribute("aColor", new BufferAttribute(tints, 3));
    return {
      tailMaterial: streakMaterial(planeVertex, tailFragment, {
        uCore: { value: new Color("#efe9f6") },
        uMid: { value: new Color("#b9a6d8") },
        uEdge: { value: new Color("#c0389a") },
      }),
      headMaterial: streakMaterial(planeVertex, headFragment, {
        uCore: { value: new Color("#f4eff8") },
        uHalo: { value: new Color("#c8509e") },
      }),
      dustMaterial: streakMaterial(debrisVertex, debrisFragment, {
        uLength: { value: 1 },
        uWidth: { value: 1 },
        uPixelRatio: { value: 1 },
      }, true),
      dustGeometry: geometry,
    };
  }, [debris, seed]);

  const nextPass = (after: number, first: boolean): Pass => {
    const r = random.current;
    return { start: after + (first ? r.range(0.5, 2) : r.range(3, 7)), duration: r.range(7, 10), shift: r.range(-1.6, 1.6) };
  };

  useFrame((state) => {
    const t = sceneTime(state, motion);
    const still = motion.frozen || motion.reduced;
    if (!pass.current) pass.current = nextPass(t, true);
    let p = (t - pass.current.start) / pass.current.duration;
    if (p >= 1) {
      pass.current = nextPass(t, false);
      p = (t - pass.current.start) / pass.current.duration;
    }
    const life = still ? 1 : p <= 0 ? 0 : Math.min(1, p / 0.12) * Math.min(1, (1 - p) / 0.18);
    const group = body.current;
    if (group) {
      const ux = dx / length;
      const uy = dy / length;
      const travel = still ? 0 : FALL_FROM - (FALL_FROM + FALL_TO) * Math.max(0, p);
      const shift = still ? 0 : pass.current.shift;
      group.position.set(head[0] + ux * travel - uy * shift, head[1] + uy * travel + ux * shift, 0);
      group.visible = life > 0;
    }
    for (const node of [tailMesh.current, headMesh.current, dust.current]) {
      if (!node) continue;
      const uniforms = (node.material as ShaderMaterial).uniforms;
      uniforms.uTime.value = t;
      uniforms.uLife.value = life;
    }
    const points = dust.current;
    if (points) {
      const uniforms = (points.material as ShaderMaterial).uniforms;
      uniforms.uLength.value = length;
      uniforms.uWidth.value = width;
      uniforms.uPixelRatio.value = state.viewport.dpr;
    }
  });

  return (
    <group ref={body} position={[head[0], head[1], 0]} rotation={[0, 0, angle]}>
      <mesh ref={tailMesh} position={[length / 2, 0, 0]} material={tailMaterial}>
        <planeGeometry args={[length, width]} />
      </mesh>
      <points ref={dust} geometry={dustGeometry} material={dustMaterial} frustumCulled={false} />
      <mesh ref={headMesh} material={headMaterial}>
        <planeGeometry args={[width * 1.6, width * 1.6]} />
      </mesh>
    </group>
  );
}
