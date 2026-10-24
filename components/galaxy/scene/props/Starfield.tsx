"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial, type Points } from "three";
import { createRandom } from "@/lib/galaxy/random";
import { sceneTime, useSceneMotion } from "../motion";

const vertex = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute vec3 aColor;
uniform float uTime;
uniform float uPixelRatio;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  vColor = aColor;
  vTwinkle = 0.65 + 0.35 * sin(uTime * 1.7 + aPhase);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aSize * uPixelRatio;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragment = /* glsl */ `
uniform float uOpacity;
varying vec3 vColor;
varying float vTwinkle;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float alpha = smoothstep(0.5, 0.15, d) * vTwinkle * uOpacity;
  gl_FragColor = vec4(vColor, alpha);
  #include <colorspace_fragment>
}
`;

type StarfieldProps = {
  seed: number;
  count: number;
  width?: number;
  top?: number;
  bottom?: number;
  colors: string[];
  minSize?: number;
  maxSize?: number;
  opacity?: number;
};

export default function Starfield({
  seed,
  count,
  width = 26,
  top = 5.2,
  bottom = -2,
  colors,
  minSize = 1.5,
  maxSize = 5,
  opacity = 1,
}: StarfieldProps) {
  const motion = useSceneMotion();
  const points = useRef<Points>(null);
  const { geometry, material } = useMemo(() => {
    const random = createRandom(seed);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const tints = new Float32Array(count * 3);
    const palette = colors.map((value) => new Color(value));
    for (let i = 0; i < count; i += 1) {
      positions.set([random.range(-width / 2, width / 2), random.range(bottom, top), 0], i * 3);
      sizes[i] = random.range(minSize, maxSize) * (random.next() > 0.92 ? 1.8 : 1);
      phases[i] = random.range(0, Math.PI * 2);
      const tint = random.pick(palette);
      tints.set([tint.r, tint.g, tint.b], i * 3);
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("aSize", new BufferAttribute(sizes, 1));
    result.setAttribute("aPhase", new BufferAttribute(phases, 1));
    result.setAttribute("aColor", new BufferAttribute(tints, 3));
    const shader = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uOpacity: { value: opacity },
      },
    });
    return { geometry: result, material: shader };
  }, [seed, count, width, top, bottom, colors, minSize, maxSize, opacity]);

  useFrame((state) => {
    const node = points.current;
    if (!node) return;
    const uniforms = (node.material as ShaderMaterial).uniforms;
    uniforms.uTime.value = sceneTime(state, motion);
    uniforms.uPixelRatio.value = state.viewport.dpr;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
