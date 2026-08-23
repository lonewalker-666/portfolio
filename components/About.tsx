"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, Mail } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import { personal, education } from "@/app/data/resume";

const FACTS = [
  {
    icon: Briefcase,
    label: "Focus",
    value: "Backend-heavy full-stack, fintech systems",
  },
  { icon: MapPin, label: "Based in", value: personal.location },
  {
    icon: GraduationCap,
    label: "Education",
    value: education[0]?.degree ?? "—",
  },
  { icon: Mail, label: "Reach", value: personal.email },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-border">
      <Container>
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <SectionTitle index="01" label="About" title="Profile" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed text-muted"
            >
              {personal.summary}
            </motion.p>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            {FACTS.map((fact, i) => (
              <motion.div
                key={fact.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <Card className="flex items-start gap-3 h-full">
                  <fact.icon
                    size={16}
                    className="mt-0.5 shrink-0 text-signal"
                  />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {fact.label}
                    </div>
                    <div className="mt-1 text-sm text-ink">{fact.value}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
