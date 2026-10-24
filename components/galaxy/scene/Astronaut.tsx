"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Euler, Vector3, type Group, type Object3D } from "three";
import { planetFrame, refSize } from "@/lib/galaxy/layout";
import type { ScreenId } from "@/lib/galaxy/screens";
import { dampTo, sceneTime, useSceneMotion } from "./motion";

const MODEL_URL = "/models/astronaut.glb";
const JOINTS = ["Hips", "Torso", "Head", "ArmL", "ArmR", "ForearmL", "ForearmR", "LegL", "LegR", "ShinL", "ShinR"] as const;
type Joint = (typeof JOINTS)[number];
type Rotation = [number, number, number];

type Pose = {
  joints: Partial<Record<Joint, Rotation>>;
  rootY: number;
  turn: number;
  laptop?: { position: [number, number, number]; rotation: Rotation };
  coin?: { position: [number, number, number]; rotation: Rotation };
};

const POSES: Record<ScreenId, Pose> = {
  home: {
    rootY: -0.1,
    turn: -0.75,
    joints: {
      Head: [0.18, 0, 0.05],
      ArmL: [-0.75, 0, 0.2],
      ForearmL: [-0.75, 0, -0.1],
      ArmR: [-0.75, 0, -0.2],
      ForearmR: [-0.75, 0, 0.1],
      LegL: [-1.45, 0.55, 0],
      ShinL: [1.9, 0, 0],
      LegR: [-1.45, -0.55, 0],
      ShinR: [1.9, 0, 0],
    },
    laptop: { position: [0, 0.25, 0.25], rotation: [0.15, 0, 0] },
  },
  about: {
    rootY: 0,
    turn: 0.2,
    joints: {
      Head: [-0.08, 0.2, -0.1],
      ArmR: [0, 0, -2.5],
      ForearmR: [0, 0, -0.5],
      ArmL: [-0.1, 0, 0.25],
      ForearmL: [-0.4, 0, 0],
      LegL: [0, 0, 0.06],
      LegR: [0, 0, -0.06],
    },
  },
  projects: {
    rootY: 0,
    turn: -0.25,
    joints: {
      Head: [-0.05, 0.15, 0],
      ArmR: [-0.9, 0, 0.55],
      ForearmR: [-1.5, 0, 0.3],
      ArmL: [0.05, 0, 0.18],
      LegL: [0, 0, 0.04],
      LegR: [0, 0, -0.04],
    },
    coin: { position: [-0.24, 0.085, 0.14], rotation: [0, 0.35, 0] },
  },
  skills: {
    rootY: 0,
    turn: -0.2,
    joints: {
      Head: [-0.05, -0.2, 0.05],
      ArmL: [0, 0, 2.3],
      ForearmL: [0, 0, 0.35],
      ArmR: [-0.4, 0, -0.5],
      ForearmR: [-0.9, 0, 0],
      LegL: [0, 0, 0.05],
      LegR: [0, 0, -0.05],
    },
    laptop: { position: [-0.3, 0.27, 0.12], rotation: [0.2, 0.3, -0.45] },
  },
  experience: {
    rootY: 0,
    turn: -0.15,
    joints: {
      Torso: [0.08, 0, 0.12],
      Head: [0.38, 0, -0.32],
      ArmL: [0, 0, 2.15],
      ForearmL: [0, 0, 0.1],
      ArmR: [-1.25, -0.2, -1.35],
      ForearmR: [-0.2, 0, 2.2],
      LegL: [0, 0, 0.12],
      LegR: [0, 0, -0.12],
    },
  },
};

const HEIGHT = refSize(125);
const scratch = new Euler();
const target = new Vector3();

export default function Astronaut({ screen }: { screen: ScreenId }) {
  const { scene } = useGLTF(MODEL_URL);
  const model = useMemo(() => scene.clone(true), [scene]);
  const root = useRef<Group>(null);
  const motion = useSceneMotion();
  const aspect = useThree((state) => state.size.width / state.size.height);
  const frame = planetFrame(aspect);
  const hop = useRef({ start: -10, screen });
  const nodesRef = useRef<Partial<Record<Joint | "Laptop" | "Coin", Object3D>>>({});

  useLayoutEffect(() => {
    const lookup: Partial<Record<Joint | "Laptop" | "Coin", Object3D>> = {};
    model.traverse((object) => {
      if ((JOINTS as readonly string[]).includes(object.name) || object.name === "Laptop" || object.name === "Coin") {
        lookup[object.name as Joint | "Laptop" | "Coin"] = object;
      }
    });
    nodesRef.current = lookup;
  }, [model]);

  useEffect(() => {
    hop.current.start = performance.now() / 1000;
    hop.current.screen = screen;
  }, [screen]);

  useFrame((state, delta) => {
    const group = root.current;
    if (!group) return;
    const pose = POSES[screen];
    const nodes = nodesRef.current;
    const t = sceneTime(state, motion);
    const lambda = 7;

    for (const joint of JOINTS) {
      const node = nodes[joint];
      if (!node) continue;
      const [x, y, z] = pose.joints[joint] ?? [0, 0, 0];
      node.rotation.x = dampTo(node.rotation.x, x, lambda, delta, motion);
      node.rotation.y = dampTo(node.rotation.y, y, lambda, delta, motion);
      node.rotation.z = dampTo(node.rotation.z, z, lambda, delta, motion);
    }

    for (const [name, prop] of [
      ["Laptop", pose.laptop],
      ["Coin", pose.coin],
    ] as const) {
      const node = nodes[name];
      if (!node) continue;
      node.visible = Boolean(prop);
      if (prop) {
        node.position.set(...prop.position);
        scratch.set(...prop.rotation);
        node.rotation.copy(scratch);
      }
    }

    const elapsed = performance.now() / 1000 - hop.current.start;
    const hopHeight = motion.frozen || motion.reduced || elapsed > 0.6 ? 0 : Math.sin((elapsed / 0.6) * Math.PI) * 0.35;
    const bob = motion.frozen || motion.reduced ? 0 : Math.sin(t * 1.6) * 0.012;
    target.set(0, frame.crestY + (pose.rootY + bob) * HEIGHT * frame.scale + hopHeight * frame.scale, 0.6);
    group.position.x = target.x;
    group.position.z = target.z;
    group.position.y = dampTo(group.position.y, target.y, 12, delta, motion);
    const sway = motion.frozen || motion.reduced ? 0 : Math.sin(t * 0.7) * 0.08;
    group.rotation.y = dampTo(group.rotation.y, pose.turn + sway, 6, delta, motion);
  });

  return (
    <group ref={root} scale={HEIGHT * frame.scale}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);
