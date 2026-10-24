"use client";

import { useMemo } from "react";
import { AdditiveBlending, Color, NormalBlending, ShaderMaterial } from "three";

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uCore;
uniform float uFalloff;
varying vec2 vUv;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float core = smoothstep(uCore + 0.02, uCore, d);
  float halo = pow(clamp(1.0 - d, 0.0, 1.0), uFalloff);
  float alpha = max(core, halo) * uOpacity;
  gl_FragColor = vec4(uColor, alpha);
  #include <colorspace_fragment>
}
`;

type GlowProps = {
  position: [number, number, number];
  size: number | [number, number];
  color: string;
  opacity?: number;
  core?: number;
  falloff?: number;
  additive?: boolean;
  rotation?: number;
};

export default function Glow({
  position,
  size,
  color,
  opacity = 1,
  core = 0,
  falloff = 2,
  additive = true,
  rotation = 0,
}: GlowProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: additive ? AdditiveBlending : NormalBlending,
        uniforms: {
          uColor: { value: new Color(color) },
          uOpacity: { value: opacity },
          uCore: { value: core },
          uFalloff: { value: falloff },
        },
      }),
    [color, opacity, core, falloff, additive],
  );
  const [w, h] = Array.isArray(size) ? size : [size, size];

  return (
    <mesh position={position} rotation={[0, 0, rotation]} scale={[w, h, 1]} material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}
