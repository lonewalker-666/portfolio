"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2, type Mesh } from "three";
import { SKY_GRADIENTS } from "@/lib/galaxy/palette";
import { depthScale, WORLD_HEIGHT } from "@/lib/galaxy/layout";
import { dampTo, useSceneMotion } from "./motion";

const vertex = /* glsl */ `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform vec2 uResolution;
#define SCREENS ${SKY_GRADIENTS.length}
uniform float uWeights[SCREENS];
uniform vec3 uColors[SCREENS * 5];
uniform float uStops[SCREENS * 5];

vec3 gradient(int offset, float y) {
  vec3 color = uColors[offset];
  for (int i = 1; i < 5; i++) {
    float a = uStops[offset + i - 1];
    float b = uStops[offset + i];
    color = mix(color, uColors[offset + i], smoothstep(a, b, y));
  }
  return color;
}

void main() {
  float y = 1.0 - gl_FragCoord.y / uResolution.y;
  vec3 color = vec3(0.0);
  for (int i = 0; i < SCREENS; i++) color += gradient(i * 5, y) * uWeights[i];
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

const Z = -160;

export default function SkyBackdrop({ screenIndex }: { screenIndex: number }) {
  const motion = useSceneMotion();
  const size = useThree((state) => state.size);
  const dpr = useThree((state) => state.viewport.dpr);
  const weights = useRef<number[]>(SKY_GRADIENTS.map((_, i) => (i === screenIndex ? 1 : 0)));
  const mesh = useRef<Mesh>(null);

  const material = useMemo(() => {
    const colors: Color[] = [];
    const stops: number[] = [];
    for (const gradient of SKY_GRADIENTS) {
      for (const [stop, color] of gradient) {
        stops.push(stop);
        colors.push(new Color(color));
      }
    }
    return new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      depthWrite: false,
      uniforms: {
        uResolution: { value: new Vector2(1, 1) },
        uWeights: { value: SKY_GRADIENTS.map((_, i) => (i === 0 ? 1 : 0)) },
        uColors: { value: colors },
        uStops: { value: stops },
      },
    });
  }, []);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const uniforms = (mesh.current.material as ShaderMaterial).uniforms;
    const w = weights.current;
    for (let i = 0; i < w.length; i += 1) w[i] = dampTo(w[i], i === screenIndex ? 1 : 0, 3.2, delta, motion);
    const sum = w.reduce((total, value) => total + value, 0) || 1;
    const normalized = uniforms.uWeights.value as number[];
    for (let i = 0; i < w.length; i += 1) normalized[i] = w[i] / sum;
    uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
  });

  const scale = depthScale(Z);
  const height = WORLD_HEIGHT * scale * 1.2;

  return (
    <mesh ref={mesh} position={[0, 0, Z]} material={material} renderOrder={-10}>
      <planeGeometry args={[height * 4, height]} />
    </mesh>
  );
}
