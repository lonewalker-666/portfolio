"use client";

import { useEffect, useRef } from "react";

type Handlers = {
  enabled: boolean;
  onStep: (direction: 1 | -1) => void;
  onItem: (direction: 1 | -1) => void;
  onToggle: () => void;
  onClose: () => void;
};

const WHEEL_THRESHOLD = 40;
const LOCK_MS = 900;
const SWIPE_THRESHOLD = 50;

function isEditable(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}

function scrollableAncestor(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-galaxy-scrollable]");
}

function canScroll(element: HTMLElement | null, direction: number) {
  if (!element || element.scrollHeight <= element.clientHeight + 1) return false;
  if (direction > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  return element.scrollTop > 0;
}

export function useGalaxyNavigation(handlers: Handlers) {
  const ref = useRef(handlers);

  useEffect(() => {
    ref.current = handlers;
  });

  useEffect(() => {
    let accumulated = 0;
    let lockedUntil = 0;
    let touchStart: { x: number; y: number; target: EventTarget | null } | null = null;

    const step = (direction: 1 | -1) => {
      const now = performance.now();
      if (now < lockedUntil) return;
      lockedUntil = now + LOCK_MS;
      ref.current.onStep(direction);
    };

    const onWheel = (event: WheelEvent) => {
      if (!ref.current.enabled) return;
      const direction = Math.sign(event.deltaY);
      if (canScroll(scrollableAncestor(event.target), direction)) return;
      if (performance.now() < lockedUntil) {
        accumulated = 0;
        return;
      }
      accumulated += event.deltaY;
      if (Math.abs(accumulated) >= WHEEL_THRESHOLD) {
        step(accumulated > 0 ? 1 : -1);
        accumulated = 0;
      }
    };

    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || isEditable(event.target)) return;
      const handler = ref.current;
      if (event.key === "Escape") {
        handler.onClose();
        return;
      }
      if (!handler.enabled || event.altKey || event.ctrlKey || event.metaKey) return;
      const onControl =
        event.target instanceof HTMLElement && event.target.closest("button, a") && event.target.matches(":focus-visible");
      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          if (canScroll(scrollableAncestor(event.target), 1)) return;
          event.preventDefault();
          step(1);
          break;
        case "ArrowUp":
        case "PageUp":
          if (canScroll(scrollableAncestor(event.target), -1)) return;
          event.preventDefault();
          step(-1);
          break;
        case "ArrowRight":
          event.preventDefault();
          handler.onItem(1);
          break;
        case "ArrowLeft":
          event.preventDefault();
          handler.onItem(-1);
          break;
        case "Enter":
          if (onControl) return;
          event.preventDefault();
          handler.onToggle();
          break;
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      touchStart = { x: touch.clientX, y: touch.clientY, target: event.target };
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!touchStart || !ref.current.enabled) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      const target = touchStart.target;
      touchStart = null;
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > SWIPE_THRESHOLD) {
        const direction = dy < 0 ? 1 : -1;
        if (canScroll(scrollableAncestor(target), direction)) return;
        step(direction);
      } else if (Math.abs(dx) > SWIPE_THRESHOLD) {
        ref.current.onItem(dx < 0 ? 1 : -1);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);
}
