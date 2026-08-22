"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { education } from "@/app/data/resume";

export default function Education() {
  return (
    <section id="education" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle index="05" label="Education" title="Foundations" />

        <div className="space-y-6">
          {education.map((item, i) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface2 text-signal">
                <GraduationCap size={18} />
              </div>
              <div>
                <div className="font-mono text-xs text-signal">{item.duration}</div>
                <h3 className="mt-1 font-display text-lg font-semibold">{item.degree}</h3>
                <p className="mt-0.5 text-sm text-muted">{item.institution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
