"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  target?: string;
  rel?: string;
};

const variants: Record<string, string> = {
  primary: "bg-signal text-bg hover:brightness-110 border border-signal",
  secondary:
    "bg-transparent text-ink border border-border hover:border-signal hover:text-signal",
  ghost: "bg-transparent text-muted hover:text-ink border border-transparent",
};

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  target,
  rel,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className
  );

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
