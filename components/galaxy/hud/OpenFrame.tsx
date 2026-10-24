"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { interfaceCopy } from "@/lib/galaxy/content";
import { CloseGlyph } from "./glyphs";

type ClickToOpenProps = {
  onOpen: () => void;
  home?: boolean;
  controls: string;
};

export function ClickToOpen({ onOpen, home = false, controls }: ClickToOpenProps) {
  const [first, second] = interfaceCopy.clickToOpen;
  return (
    <button
      type="button"
      className={`g-open ${home ? "g-open--home" : ""}`}
      onClick={onOpen}
      aria-expanded={false}
      aria-controls={controls}
      aria-label="Click to open details"
    >
      <span className="g-corner g-corner--tl" />
      <span className="g-corner g-corner--br" />
      <span className="g-open__text g-display g-display--bright" aria-hidden="true">
        <span>{first}</span>
        <span>{second}</span>
      </span>
    </button>
  );
}

type InfoPanelProps = {
  id: string;
  label: string;
  onClose: () => void;
  home?: boolean;
  dense?: boolean;
  children: ReactNode;
};

export function InfoPanel({ id, label, onClose, home = false, dense = false, children }: InfoPanelProps) {
  const reduced = useReducedMotion();
  const body = useRef<HTMLDivElement>(null);

  useEffect(() => {
    body.current?.focus({ preventScroll: true });
  }, []);

  return (
    <motion.section
      id={id}
      className={`g-panel ${home ? "g-panel--home" : ""}`}
      aria-label={label}
      data-galaxy-panel=""
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="g-corner g-corner--tl" />
      <span className="g-corner g-corner--br" />
      <div className="g-panel__frame" />
      <div
        ref={body}
        className={`g-panel__body ${dense ? "g-panel__body--dense" : ""}`}
        tabIndex={-1}
        data-galaxy-scrollable=""
      >
        {children}
      </div>
      <button type="button" className="g-panel__close" onClick={onClose} aria-label="Close details">
        <CloseGlyph />
      </button>
    </motion.section>
  );
}
