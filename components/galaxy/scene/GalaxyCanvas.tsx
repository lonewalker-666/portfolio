"use client";

import { Suspense, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { NoToneMapping } from "three";
import { CAMERA_DISTANCE, CAMERA_FOV } from "@/lib/galaxy/layout";
import { screenIndex, type ScreenId } from "@/lib/galaxy/screens";
import AboutEnvironment from "./environments/AboutEnvironment";
import Astronaut from "./Astronaut";
import ExperienceEnvironment from "./environments/ExperienceEnvironment";
import HomeEnvironment from "./environments/HomeEnvironment";
import ProjectsEnvironment from "./environments/ProjectsEnvironment";
import SkillsEnvironment from "./environments/SkillsEnvironment";
import HeroPlanet from "./HeroPlanet";
import { SceneMotionContext, type SceneMotion } from "./motion";
import SkyBackdrop from "./SkyBackdrop";

type GalaxyCanvasProps = {
  screen: ScreenId;
  motion: SceneMotion;
  onReady: () => void;
  eventSource: RefObject<HTMLDivElement | null>;
};

function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    frames.current += 1;
    if (frames.current > 8) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

export default function GalaxyCanvas({ screen, motion, onReady, eventSource }: GalaxyCanvasProps) {
  const [effects] = useState(
    () =>
      !window.matchMedia("(max-width: 640px)").matches &&
      (navigator.hardwareConcurrency || 8) > 4 &&
      new URLSearchParams(window.location.search).get("fx") !== "0",
  );
  const [dpr] = useState(() => {
    const phone = window.matchMedia("(max-width: 640px)").matches;
    const modest = (navigator.hardwareConcurrency || 8) <= 4;
    return Math.min(window.devicePixelRatio || 1, modest ? 1.25 : phone ? 1.5 : 2);
  });
  const index = screenIndex(screen);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={dpr}
      flat
      gl={{ antialias: true, powerPreference: "high-performance", toneMapping: NoToneMapping }}
      camera={{ fov: CAMERA_FOV, position: [0, 0, CAMERA_DISTANCE], near: 0.5, far: 400 }}
      eventSource={eventSource}
      aria-hidden="true"
    >
      <SceneMotionContext.Provider value={motion}>
        <ambientLight intensity={0.9} color="#c9c2ff" />
        <hemisphereLight args={["#d9d4ff", "#3b1f6e", 0.8]} />
        <directionalLight position={[-4, 6, 9]} intensity={2.4} color="#ffffff" />
        <directionalLight position={[5, 3, -6]} intensity={1.6} color="#9a6bff" />
        <SkyBackdrop screenIndex={index} />
        <HomeEnvironment active={screen === "home"} />
        <AboutEnvironment active={screen === "about"} />
        <ProjectsEnvironment active={screen === "projects"} />
        <SkillsEnvironment active={screen === "skills"} />
        <ExperienceEnvironment active={screen === "experience"} />
        <HeroPlanet screenIndex={index} />
        <Suspense fallback={null}>
          <Astronaut screen={screen} />
          <ReadySignal onReady={onReady} />
        </Suspense>
        {effects && (
          <EffectComposer multisampling={0}>
            <Bloom mipmapBlur luminanceThreshold={0.85} luminanceSmoothing={0.2} intensity={0.9} radius={0.7} />
          </EffectComposer>
        )}
      </SceneMotionContext.Provider>
    </Canvas>
  );
}
