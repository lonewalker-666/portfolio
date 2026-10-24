"use client";

import { useRef } from "react";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

const BACKGROUNDS = { light: "#f4eee5", dark: "#0d0c0b" };

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();
  const button = useRef<HTMLButtonElement>(null);
  const busy = useRef(false);
  const next = theme === "dark" ? "light" : "dark";

  const onClick = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = button.current?.getBoundingClientRect();
    if (reduced || !rect || busy.current) {
      toggleTheme();
      return;
    }
    busy.current = true;
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const wipe = document.createElement("span");
    wipe.className = "sx-wipe";
    wipe.setAttribute("aria-hidden", "true");
    document.body.appendChild(wipe);
    gsap.set(wipe, {
      width: radius * 2,
      height: radius * 2,
      left: x - radius,
      top: y - radius,
      backgroundColor: BACKGROUNDS[next],
      scale: 0,
      autoAlpha: 1,
    });
    gsap
      .timeline({
        onComplete: () => {
          wipe.remove();
          busy.current = false;
        },
      })
      .to(button.current, { rotation: "+=180", duration: 0.6, ease: "power3.inOut" }, 0)
      .to(wipe, { scale: 1, duration: 0.65, ease: "power3.inOut" }, 0)
      .add(() => toggleTheme())
      .to(wipe, { autoAlpha: 0, duration: 0.45, ease: "power2.out" }, "+=0.05");
  };

  return (
    <button ref={button} type="button" className="sx-theme" onClick={onClick} aria-label={`Switch to ${next} theme`}>
      {theme === "dark" ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
