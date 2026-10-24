"use client";

import { useMemo } from "react";
import { ExtrudeGeometry, Shape } from "three";

type MonolithProps = {
  position: [number, number, number];
  width: number;
  height: number;
  tilt?: number;
  bevel?: number;
  color?: string;
  edge?: string;
};

export default function Monolith({
  position,
  width,
  height,
  tilt = 0,
  bevel = 0.25,
  color = "#05040b",
  edge = "#3fe0d0",
}: MonolithProps) {
  const geometry = useMemo(() => {
    const shape = new Shape();
    shape.moveTo(-width / 2, 0);
    shape.lineTo(width / 2, 0);
    shape.lineTo(width / 2, height * (1 - bevel * 0.4));
    shape.lineTo(width * 0.1, height);
    shape.lineTo(-width / 2, height * (1 - bevel));
    shape.lineTo(-width / 2, 0);
    return new ExtrudeGeometry(shape, { depth: width * 0.8, bevelEnabled: false });
  }, [width, height, bevel]);

  return (
    <group position={position} rotation={[0, -0.5, tilt]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0} flatShading />
      </mesh>
      <mesh position={[width / 2 + 0.005, height * 0.5, width * 0.4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.02, height * 0.9]} />
        <meshBasicMaterial color={edge} toneMapped={false} />
      </mesh>
    </group>
  );
}
