"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Container from "@/components/Container";
import SectionTitle from "@/components/SectionTitle";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/app/data/resume";

const CATEGORIES = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesQuery =
        query.trim() === "" ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.stack.some((t) => t.toLowerCase().includes(query.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <section id="projects" className="py-24 md:py-32 border-t border-border">
      <Container>
        <SectionTitle
          index="04"
          label="Projects"
          title="Selected systems"
          description="Case studies drawn from production work and independent client engagements."
        />

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                  category === cat
                    ? "border-signal bg-signal/10 text-signal"
                    : "border-border text-muted hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <label className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or stack…"
              aria-label="Search projects"
              className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:border-signal outline-none"
            />
          </label>
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-muted">
            No projects match that search. Try a different keyword or category.
          </p>
        )}
      </Container>
    </section>
  );
}
