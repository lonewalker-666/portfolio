"use client";

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, type Group, type Material, type Mesh, type Points } from "three";
import { dampTo, useSceneMotion } from "../motion";

type Entry = { material: Material; base: number; blended: boolean };

function collect(group: Group) {
  const entries: Entry[] = [];
  const seen = new Set<Material>();
  group.traverse((object) => {
    const material = (object as Mesh | Points).material;
    if (!material) return;
    const list = Array.isArray(material) ? material : [material];
    for (const item of list) {
      if (seen.has(item)) continue;
      seen.add(item);
      const uniform = item instanceof ShaderMaterial ? item.uniforms.uOpacity : undefined;
      entries.push({ material: item, base: uniform ? (uniform.value as number) : item.opacity, blended: item.transparent });
    }
  });
  return entries;
}

export function useFade(ref: RefObject<Group | null>, active: boolean, travel = 0.8) {
  const motion = useSceneMotion();
  const progress = useRef(active ? 1 : 0);
  const entries = useRef<Entry[] | null>(null);
  const applied = useRef(-1);

  useFrame((_, delta) => {
    const group = ref.current;
    if (!group) return;
    if (!entries.current) entries.current = collect(group);
    const target = active ? 1 : 0;
    progress.current = dampTo(progress.current, target, 3.2, delta, motion);
    if (Math.abs(progress.current - target) < 0.001) progress.current = target;
    const p = progress.current;
    group.visible = p > 0.001;
    group.position.y = (1 - p) * (active ? -travel : travel);
    if (p === applied.current) return;
    applied.current = p;
    for (const { material, base, blended } of entries.current) {
      const opacity = base * p;
      if (material instanceof ShaderMaterial && material.uniforms.uOpacity) {
        material.uniforms.uOpacity.value = opacity;
      } else {
        material.opacity = opacity;
      }
      const transparent = blended || base < 1 || p < 0.999;
      if (material.transparent !== transparent) {
        material.transparent = transparent;
        material.needsUpdate = true;
      }
    }
  });
}
