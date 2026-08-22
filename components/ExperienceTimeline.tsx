"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { experience as timeline, Experience } from "@/app/data/resume";



function EntryCard({
  entry,
  index,
  isLast,
}: {
  entry: Experience;
  index: number;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
      className="relative pl-10"
    >
      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-signal bg-bg" />
      {!isLast && (
        <span className="absolute left-[5px] top-5 bottom-[-2.5rem] w-px bg-border" />
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left rounded-2xl border border-border bg-surface hover:border-signal/50 transition-colors p-5 md:p-6"
      >
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="font-mono text-xs text-signal">{entry.duration}</div>
            <h3 className="mt-1 font-display text-xl font-semibold">{entry.role}</h3>
            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
              <span>{entry.company}</span>
              <span className="text-border">·</span>
              <MapPin size={12} />
              <span>{entry.location}</span>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`shrink-0 mt-1 text-muted transition-transform duration-300 ${
              open ? "rotate-180 text-signal" : ""
            }`}
          />
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2.5">
                {entry.description.map((line, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-muted leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              {entry.technologies.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border bg-surface2 px-2.5 py-1 font-mono text-[11px] text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle
          index="03"
          label="Experience"
          title="Where the systems got built"
          description="Reverse-chronological log of engagements — expand any entry for the full scope."
        />

        <div className="space-y-10">
          {timeline.map((entry, i) => (
            <EntryCard
              key={`${entry.company}-${entry.duration}`}
              entry={entry}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
