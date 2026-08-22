"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import Card from "@/components/Card";
import { skills } from "@/app/data/resume";

export default function SkillsGrid() {
  return (
    <section id="skills" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle
          index="02"
          label="Skills"
          title="Toolbox"
          description="Grouped the way I actually reach for it — languages up through infra and the fintech-specific stack that shows up in most of my production work."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            >
              <Card className="h-full">
                <h3 className="font-mono text-xs uppercase tracking-widest text-signal mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-ink transition-colors hover:border-signal hover:text-signal"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
