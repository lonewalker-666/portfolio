"use client";

import { useMemo } from "react";
import { Color, ShaderMaterial } from "three";
import { simplexNoise3D } from "../shaders/noise";

const vertex = /* glsl */ `
varying vec3 vNormal;
varying vec3 vObject;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vObject = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragment = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uShade;
uniform vec3 uLimb;
uniform vec3 uSpeck;
uniform float uSpeckAmount;
uniform float uBands;
uniform float uOpacity;
uniform float uSeed;
varying vec3 vNormal;
varying vec3 vObject;
${simplexNoise3D}
void main() {
  vec3 n = normalize(vNormal);
  vec3 p = normalize(vObject);
  float light = dot(n, normalize(vec3(-0.5, 0.6, 0.6)));
  vec3 color = mix(uShade, uColor, smoothstep(-0.4, 0.7, light));
  float band = fbm(vec3(p.x * 1.5, p.y * 6.0, p.z * 1.5) + uSeed);
  color = mix(color, uShade, smoothstep(0.05, 0.3, band) * uBands);
  float speck = snoise(p * 26.0 + uSeed);
  color = mix(color, uSpeck, smoothstep(0.62, 0.7, speck) * uSpeckAmount);
  float rim = 1.0 - clamp(n.z, 0.0, 1.0);
  color = mix(color, uLimb, smoothstep(0.55, 0.95, rim) * 0.7);
  gl_FragColor = vec4(color, uOpacity);
  #include <colorspace_fragment>
}
`;

type OrbProps = {
  position: [number, number, number];
  radius: number;
  color: string;
  shade: string;
  limb: string;
  speck?: string;
  speckAmount?: number;
  bands?: number;
  opacity?: number;
  seed?: number;
};

export default function Orb({
  position,
  radius,
  color,
  shade,
  limb,
  speck = "#000000",
  speckAmount = 0,
  bands = 0.3,
  opacity = 1,
  seed = 0,
}: OrbProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: opacity < 1,
        depthWrite: opacity >= 1,
        uniforms: {
          uColor: { value: new Color(color) },
          uShade: { value: new Color(shade) },
          uLimb: { value: new Color(limb) },
          uSpeck: { value: new Color(speck) },
          uSpeckAmount: { value: speckAmount },
          uBands: { value: bands },
          uOpacity: { value: opacity },
          uSeed: { value: seed },
        },
      }),
    [color, shade, limb, speck, speckAmount, bands, opacity, seed],
  );

  return (
    <mesh position={position} scale={radius} material={material}>
      <sphereGeometry args={[1, 64, 48]} />
    </mesh>
  );
}
