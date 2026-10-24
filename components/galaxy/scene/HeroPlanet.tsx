"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  AdditiveBlending,
  BackSide,
  Color,
  HalfFloatType,
  LinearFilter,
  Mesh as ThreeMesh,
  OrthographicCamera,
  PlaneGeometry,
  RepeatWrapping,
  Scene,
  ShaderMaterial,
  WebGLRenderTarget,
  type Group,
  type Mesh,
} from "three";
import { planetFrame } from "@/lib/galaxy/layout";
import { dampTo, sceneTime, useSceneMotion } from "./motion";
import { simplexNoise3D } from "./shaders/noise";

const surfaceVertex = /* glsl */ `
varying vec3 vObjectNormal;
varying vec3 vViewNormal;
varying vec3 vViewPosition;
void main() {
  vObjectNormal = normalize(position);
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewNormal = normalize(normalMatrix * normal);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const BAKE_WIDTH = 2048;
const BAKE_HEIGHT = 1024;

const bakeVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const bakeFragment = /* glsl */ `
${simplexNoise3D}
varying vec2 vUv;
void main() {
  float lon = (vUv.x - 0.5) * 6.28318530718;
  float lat = (vUv.y - 0.5) * 3.14159265359;
  vec3 p = vec3(cos(lat) * sin(lon), sin(lat), cos(lat) * cos(lon));
  vec3 warp = vec3(fbm(p * 1.4 + 3.1), fbm(p * 1.4 + 7.7), fbm(p * 1.4 + 1.3));
  vec3 q = p + warp * 0.45;
  float deep = fbm(q * 2.2 + 11.0);
  float swirl = sin(q.y * 14.0 + fbm(q * 3.0) * 6.0);
  float shallow = fbm(q * 2.6 + 23.0);
  float land = fbm(q * 1.5 + 41.0);
  gl_FragColor = vec4(deep, swirl, shallow, land);
}
`;

const surfaceFragment = /* glsl */ `
uniform vec3 uDeep;
uniform vec3 uOcean;
uniform vec3 uSwirl;
uniform vec3 uShallow;
uniform vec3 uLand;
uniform vec3 uSpeck;
uniform vec3 uRim;
uniform sampler2D uFields;
varying vec3 vObjectNormal;
varying vec3 vViewNormal;
varying vec3 vViewPosition;
${simplexNoise3D}
void main() {
  vec3 p = normalize(vObjectNormal);
  vec2 uv = vec2(atan(p.x, p.z) / 6.28318530718 + 0.5, asin(clamp(p.y, -1.0, 1.0)) / 3.14159265359 + 0.5);
  vec4 fields = texture2D(uFields, uv);

  vec3 color = uOcean;
  color = mix(color, uDeep, step(0.18, fields.r) * 0.85);
  color = mix(color, uSwirl, smoothstep(0.82, 0.9, fields.g) * 0.7);

  vec3 viewDir = normalize(vViewPosition);
  float facing = clamp(dot(normalize(vViewNormal), viewDir), 0.0, 1.0);
  float limb = smoothstep(0.35, 0.9, 1.0 - facing);
  color = mix(color, uShallow, smoothstep(0.42 - limb * 0.32, 0.46 - limb * 0.32, fields.b));
  color = mix(color, uLand, smoothstep(0.26, 0.29, fields.a) * 0.82);

  float speck = snoise(p * 48.0);
  color = mix(color, uSpeck, smoothstep(0.8, 0.86, speck) * 0.8);

  float fresnel = 1.0 - facing;
  color = mix(color, vec3(0.3, 0.86, 0.95), smoothstep(0.45, 0.95, fresnel) * 0.6);
  color *= mix(0.86, 1.06, smoothstep(-0.6, 0.6, vViewNormal.y));
  color = mix(color, uRim, smoothstep(0.93, 0.985, fresnel));

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`;

const haloVertex = /* glsl */ `
varying vec3 vViewNormal;
varying vec3 vViewPosition;
void main() {
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewNormal = normalize(normalMatrix * normal);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const haloFragment = /* glsl */ `
uniform vec3 uColor;
uniform float uIntensity;
varying vec3 vViewNormal;
varying vec3 vViewPosition;
void main() {
  float facing = dot(normalize(vViewNormal), normalize(vViewPosition));
  float glow = pow(clamp(-facing / 0.32, 0.0, 1.0), 3.5);
  gl_FragColor = vec4(uColor * glow * uIntensity, glow);
  #include <colorspace_fragment>
}
`;

type HeroPlanetProps = {
  screenIndex: number;
};

export default function HeroPlanet({ screenIndex }: HeroPlanetProps) {
  const group = useRef<Group>(null);
  const surface = useRef<Mesh>(null);
  const motion = useSceneMotion();
  const aspect = useThree((state) => state.size.width / state.size.height);
  const frame = planetFrame(aspect);
  const spin = useRef(screenIndex * Math.PI * 0.5);
  const gl = useThree((state) => state.gl);

  const fields = useMemo(
    () =>
      new WebGLRenderTarget(BAKE_WIDTH, BAKE_HEIGHT, {
        type: HalfFloatType,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        wrapS: RepeatWrapping,
        depthBuffer: false,
        generateMipmaps: false,
      }),
    [],
  );

  useEffect(() => {
    const material = new ShaderMaterial({ vertexShader: bakeVertex, fragmentShader: bakeFragment, depthTest: false, depthWrite: false });
    const geometry = new PlaneGeometry(2, 2);
    const scene = new Scene();
    scene.add(new ThreeMesh(geometry, material));
    const previous = gl.getRenderTarget();
    gl.setRenderTarget(fields);
    gl.render(scene, new OrthographicCamera(-1, 1, 1, -1, 0, 1));
    gl.setRenderTarget(previous);
    material.dispose();
    geometry.dispose();
  }, [gl, fields]);

  useEffect(() => () => fields.dispose(), [fields]);

  const surfaceMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: surfaceVertex,
        fragmentShader: surfaceFragment,
        uniforms: {
          uDeep: { value: new Color("#2350b8") },
          uOcean: { value: new Color("#2c66d2") },
          uSwirl: { value: new Color("#45a2f2") },
          uShallow: { value: new Color("#3cc4e2") },
          uLand: { value: new Color("#55785f") },
          uSpeck: { value: new Color("#5fe0f4") },
          uRim: { value: new Color("#eaf6ff") },
          uFields: { value: fields.texture },
        },
      }),
    [fields],
  );

  const haloMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: haloVertex,
        fragmentShader: haloFragment,
        uniforms: {
          uColor: { value: new Color("#38d6ff") },
          uIntensity: { value: 1.0 },
        },
        side: BackSide,
        blending: AdditiveBlending,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useFrame((state, delta) => {
    const mesh = surface.current;
    if (!mesh) return;
    const t = sceneTime(state, motion);
    spin.current = dampTo(spin.current, screenIndex * Math.PI * 0.5, 1.6, delta, motion);
    mesh.rotation.set(0.35, spin.current + t * 0.02, 0.1);
  });

  return (
    <group ref={group} position={[0, frame.centerY, 0]} scale={frame.radius}>
      <mesh ref={surface} material={surfaceMaterial}>
        <sphereGeometry args={[1, 160, 120]} />
      </mesh>
      <mesh material={haloMaterial} scale={1.055}>
        <sphereGeometry args={[1, 96, 64]} />
      </mesh>
    </group>
  );
}
