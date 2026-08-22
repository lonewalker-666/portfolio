"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import { certifications } from "@/app/data/resume";

export default function Certifications() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle index="06" label="Certifications" title="Credentials" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <Award size={18} className="text-signal" />
              <h3 className="mt-3 font-display font-semibold">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
              <p className="mt-3 font-mono text-xs text-muted">{cert.date}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
