"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const indian = new Intl.NumberFormat("en-IN");

export default function Motion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const one = (selector: string) => q(selector)[0] as HTMLElement | undefined;

      const bar = one(".sx-bar");
      if (bar) {
        ScrollTrigger.create({ start: 80, end: "max", toggleClass: { targets: bar, className: "is-solid" } });
      }

      const mm = gsap.matchMedia();
      mm.add(
        { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" },
        (context) => {
          const { motion, desktop } = context.conditions as { motion: boolean; desktop: boolean };
          if (!motion) return;

          const lenis = new Lenis({ lerp: 0.1, anchors: true });
          const tick = (time: number) => lenis.raf(time * 1000);
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);

          const hero = one(".sx-hero");
          if (hero) {
            const scrub = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
            gsap.to(q(".sx-hero__giant"), { yPercent: -40, ease: "none", scrollTrigger: scrub });
            gsap.to(q(".sx-hero__person"), { yPercent: 12, scale: 1.06, ease: "none", scrollTrigger: scrub });
            gsap.to(q(".sx-float--a"), { yPercent: -120, ease: "none", scrollTrigger: scrub });
            gsap.to(q(".sx-float--b"), { yPercent: -70, ease: "none", scrollTrigger: scrub });
            gsap.to(q(".sx-hero__content"), { autoAlpha: 0, yPercent: -10, ease: "none", scrollTrigger: { ...scrub, end: "60% top" } });
          }

          const loops = q(".sx-band").map((band, i) =>
            gsap.to(band, { xPercent: i % 2 ? 0 : -50, startAt: { xPercent: i % 2 ? -50 : 0 }, duration: 28, ease: "none", repeat: -1 }),
          );
          ScrollTrigger.create({
            trigger: one(".sx-marquee"),
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 400, 4);
              loops.forEach((loop) => {
                gsap.to(loop, { timeScale: boost, duration: 0.2, overwrite: true });
                gsap.to(loop, { timeScale: 1, duration: 1, delay: 0.2 });
              });
            },
          });

          const words = q(".sx-reveal .w");
          const about = one(".sx-about");
          if (words.length && about) {
            gsap.fromTo(
              words,
              { opacity: 0.14 },
              {
                opacity: 1,
                stagger: 0.1,
                ease: "none",
                scrollTrigger: desktop
                  ? { trigger: about, start: "top top", end: "+=120%", pin: true, scrub: true }
                  : { trigger: one(".sx-reveal"), start: "top 80%", end: "bottom 45%", scrub: true },
              },
            );
            gsap.from(q(".sx-photo"), {
              yPercent: 12,
              rotation: -9,
              autoAlpha: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: { trigger: about, start: "top 75%", once: true },
            });
          }

          q(".sx-stat__value").forEach((el) => {
            const target = Number(el.dataset.value) || 0;
            const prefix = el.dataset.prefix ?? "";
            const suffix = el.dataset.suffix ?? "";
            const counter = { v: 0 };
            gsap.to(counter, {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onUpdate: () => {
                el.textContent = `${prefix}${indian.format(Math.round(counter.v))}${suffix}`;
              },
            });
          });

          gsap.from(q(".sx-bot"), {
            y: 90,
            rotation: (i) => (i % 2 ? 4 : -4),
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: one(".sx-crew__grid"), start: "top 80%", once: true },
          });

          gsap.from(q(".sx-svc"), {
            x: -60,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: one(".sx-services__list"), start: "top 80%", once: true },
          });

          const panels = q(".sx-panel");
          if (desktop) {
            panels.forEach((panel, i) => {
              const next = panels[i + 1];
              if (!next) return;
              const scrollTrigger = { trigger: next, start: "top bottom", end: "top 90px", scrub: true };
              gsap.to(panel, { scale: 0.9, ease: "none", scrollTrigger });
              gsap.to(panel.querySelector(".sx-panel__shade"), { autoAlpha: 0.55, ease: "none", scrollTrigger });
            });
          }
          q(".sx-mock").forEach((mock) => {
            gsap.from(mock, {
              y: 60,
              rotation: 2,
              autoAlpha: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: mock, start: "top 85%", once: true },
            });
          });
          q(".sx-mock__chart path[data-draw]").forEach((path) => {
            const length = (path as unknown as SVGPathElement).getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              { strokeDashoffset: 0, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: path, start: "top 85%", once: true } },
            );
          });

          const exp = one(".sx-exp");
          if (exp) {
            gsap.fromTo(q(".sx-exp__ghost"), { xPercent: 5 }, { xPercent: -35, ease: "none", scrollTrigger: { trigger: exp, start: "top bottom", end: "bottom top", scrub: true } });
            gsap.fromTo(q(".sx-exp__line"), { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: one(".sx-exp__list"), start: "top 70%", end: "bottom 60%", scrub: true } });
            q(".sx-job").forEach((job) => {
              gsap.from(job, { y: 50, autoAlpha: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: job, start: "top 85%", once: true } });
            });
          }

          gsap.from(q(".sx-chip"), {
            y: -160,
            rotation: (i) => (i % 2 ? 25 : -25),
            autoAlpha: 0,
            duration: 1.1,
            ease: "bounce.out",
            stagger: { each: 0.05, from: "random" },
            scrollTrigger: { trigger: one(".sx-skills__cloud"), start: "top 80%", once: true },
          });

          const finale = one(".sx-finale");
          if (finale) {
            gsap.fromTo(q(".sx-finale__ghost"), { scale: 0.8, autoAlpha: 0.2 }, { scale: 1, autoAlpha: 1, ease: "none", scrollTrigger: { trigger: finale, start: "top bottom", end: "top top", scrub: true } });
            gsap.fromTo(q(".sx-finale__person"), { yPercent: 25 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: finale, start: "top bottom", end: "top 10%", scrub: true } });
          }

          q("[data-rise]").forEach((el) => {
            gsap.from(el, { y: 50, autoAlpha: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", once: true } });
          });

          document.fonts?.ready.then(() => ScrollTrigger.refresh());

          return () => {
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33);
            lenis.destroy();
          };
        },
      );

      return () => mm.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
