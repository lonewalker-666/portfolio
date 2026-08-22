"use client";

import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import type { Project } from "@/app/data/resume";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className="group relative rounded-2xl border border-border bg-surface p-6 overflow-hidden hover:border-signal/50 transition-colors"
    >
      <div
        className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-signal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="rounded-md border border-border bg-surface2 px-2 py-0.5 font-mono text-[11px] text-signal">
          {project.category}
        </span>
        <ArrowUpRight
          size={16}
          className="text-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
        />
      </div>

      <h3 className="relative mt-4 font-display text-lg font-semibold">{project.title}</h3>
      <p className="relative mt-2 text-sm text-muted leading-relaxed">{project.description}</p>

      {project.metric && (
        <div className="relative mt-4 font-mono text-xs text-signal">{project.metric}</div>
      )}

      <div className="relative mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-surface2 px-2 py-0.5 font-mono text-[10px] text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="relative mt-5 flex gap-4 border-t border-border pt-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-signal transition-colors"
            >
              <GithubIcon className="h-[13px] w-[13px]" /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-muted hover:text-signal transition-colors"
            >
              <ExternalLink size={13} /> Live Demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
