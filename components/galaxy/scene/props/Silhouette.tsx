"use client";

import { useMemo } from "react";
import { BufferAttribute, Color, Shape, ShapeGeometry } from "three";
import { createRandom } from "@/lib/galaxy/random";

export type SilhouetteProps = {
  seed: number;
  from: number;
  to: number;
  base: number;
  bottom?: number;
  minHeight: number;
  maxHeight: number;
  count: number;
  spike?: number;
  color: string;
  topColor?: string;
  opacity?: number;
  flatTop?: boolean;
};

export function buildSilhouette({
  seed,
  from,
  to,
  base,
  bottom = -8,
  minHeight,
  maxHeight,
  count,
  spike = 0.35,
  flatTop = false,
}: Omit<SilhouetteProps, "color" | "topColor" | "opacity">) {
  const random = createRandom(seed);
  const shape = new Shape();
  shape.moveTo(from, bottom);
  shape.lineTo(from, base + random.range(0, minHeight));
  const step = (to - from) / count;
  for (let i = 0; i < count; i += 1) {
    const x0 = from + i * step;
    const center = x0 + step * random.range(0.3, 0.7);
    const height = random.range(minHeight, maxHeight);
    const width = step * random.range(0.35, 0.6);
    const shoulder = base + height * random.range(0.3, 0.6);
    shape.lineTo(center - width, base + random.range(0, minHeight * 0.6));
    shape.lineTo(center - width * 0.55, shoulder);
    if (flatTop) {
      shape.lineTo(center - width * 0.45, base + height);
      shape.lineTo(center + width * 0.4, base + height - random.range(0, 0.2));
    } else {
      shape.lineTo(center - width * spike * 0.4, base + height * random.range(0.8, 0.92));
      shape.lineTo(center + random.range(-0.05, 0.05), base + height);
      shape.lineTo(center + width * spike * 0.5, base + height * random.range(0.6, 0.85));
    }
    shape.lineTo(center + width * 0.6, shoulder * random.range(0.95, 1.05));
    shape.lineTo(center + width, base + random.range(0, minHeight * 0.6));
  }
  shape.lineTo(to, base + random.range(0, minHeight));
  shape.lineTo(to, bottom);
  shape.lineTo(from, bottom);
  return shape;
}

export default function Silhouette(props: SilhouetteProps) {
  const { color, topColor, opacity = 1 } = props;
  const geometry = useMemo(() => {
    const result = new ShapeGeometry(buildSilhouette(props), 1);
    const positions = result.getAttribute("position");
    const bottomColor = new Color(color);
    const upperColor = new Color(topColor ?? color);
    const top = props.base + props.maxHeight;
    const colors = new Float32Array(positions.count * 3);
    const mixed = new Color();
    for (let i = 0; i < positions.count; i += 1) {
      const t = Math.min(1, Math.max(0, (positions.getY(i) - props.base) / (top - props.base)));
      mixed.copy(bottomColor).lerp(upperColor, t);
      colors.set([mixed.r, mixed.g, mixed.b], i * 3);
    }
    result.setAttribute("color", new BufferAttribute(colors, 3));
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.seed, props.from, props.to, props.base, props.minHeight, props.maxHeight, props.count, color, topColor]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial vertexColors transparent={opacity < 1} opacity={opacity} />
    </mesh>
  );
}
