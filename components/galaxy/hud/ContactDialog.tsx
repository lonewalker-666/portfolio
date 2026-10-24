"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { personal } from "@/app/data/resume";
import { interfaceCopy } from "@/lib/galaxy/content";
import { CloseGlyph } from "./glyphs";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select, [tabindex]:not([tabindex="-1"])';

export default function ContactDialog({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const node = dialog.current;
    node?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      className="g-dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="galaxy-contact-title"
        className="g-dialog"
        initial={reduced ? false : { scale: 0.94, y: 12 }}
        animate={{ scale: 1, y: 0 }}
        exit={reduced ? undefined : { scale: 0.96, y: 8 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="g-corner g-corner--tl" />
        <span className="g-corner g-corner--br" />
        <button type="button" className="g-panel__close" style={{ top: 14, right: 14 }} onClick={onClose} aria-label="Close contact form">
          <CloseGlyph />
        </button>
        <h2 id="galaxy-contact-title" className="g-dialog__title g-label g-glow-text">
          {interfaceCopy.contact}
        </h2>
        <p className="mb-6 text-sm text-[var(--g-lavender-soft)]">
          Send a transmission to{" "}
          <a className="underline underline-offset-4" href={`mailto:${personal.email}`}>
            {personal.email}
          </a>
        </p>
        <ContactForm />
      </motion.div>
    </motion.div>
  );
}
