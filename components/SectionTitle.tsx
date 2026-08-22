"use client";

import { motion } from "framer-motion";

export default function SectionTitle({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-12 md:mb-16"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs text-signal">{index}</span>
        <span className="h-px flex-1 max-w-10 bg-border" />
        <span className="font-mono text-xs uppercase tracking-widest text-muted">
          {label}
        </span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-muted leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
