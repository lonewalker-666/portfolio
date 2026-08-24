"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { personal } from "@/app/data/resume";
import Image from "next/image";

const READOUT = [
  { label: "records migrated, zero data loss", value: "10,000+" },
  { label: "publish time after pipeline rework", value: "-80%" },
  { label: "daily transactions handled in production", value: "500+" },
  { label: "years shipping backend-critical systems", value: "4+" },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex  flex-col justify-center overflow-hidden py-24 md:py-32"
    >
      <div className="absolute inset-0 ledger-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_20%,black,transparent)]" />
      <div
        className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-signal/10 blur-[120px]"
        aria-hidden="true"
      />

      <Container className="relative flex flex-col lg:flex-row gap-10 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >
          {/* <motion.div
            variants={item}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-signal"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            {personal.status}
          </motion.div> */}

          <motion.h1
            variants={item}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.05] tracking-tight text-balance"
          >
            I build the systems behind
            <br className="hidden sm:block" />{" "}
            <span className="relative inline-block text-signal">
              money, media, and scale.
              <svg
                className="absolute -bottom-1 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M1 5.5 C 50 1, 150 1, 199 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl leading-relaxed">
            <span className="block text-lg font-medium text-ink">
              {personal.name}
            </span>

            <span className="mt-1 block text-base text-muted">
              {personal.role} · {personal.tagline}
            </span>

            <span className="mt-3 block text-base text-muted">
              Based in {personal.location}, building full-stack products across
              fintech, EdTech, SaaS, logistics, and real-time applications.
            </span>
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Button href="#projects">
              View Projects <ArrowDown size={15} />
            </Button>
            <Button
              href="/resume.pdf"
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={15} /> Download Resume
            </Button>
            <Button href="#contact" variant="ghost">
              <Mail size={15} /> Contact
            </Button>
          </motion.div>
        </motion.div>
        <motion.div>
          <Image
            src="/hero.png"
            width={520}
            height={520}
            alt="KK"
            priority
            sizes="520px"
          />
        </motion.div>
      </Container>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 rounded-2xl border border-border bg-surface/70 backdrop-blur-sm overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-wire/70" />
            </div>
            <span className="font-mono text-xs text-muted">impact.log</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 divide-x-0 md:divide-x divide-border">
            {READOUT.map((stat, i) => (
              <div
                key={stat.label}
                className={`p-5 ${i >= 2 ? "border-t md:border-t-0" : ""} border-border`}
              >
                <div className="font-mono text-2xl md:text-3xl font-semibold text-signal">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-muted leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border px-4 py-2.5 font-mono text-xs text-muted">
            <span className="text-signal">$</span> tail -f production.log
            <span className="inline-block h-3.5 w-1.75 bg-signal/70 animate-blink" />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
