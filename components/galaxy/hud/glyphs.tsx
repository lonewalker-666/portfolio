import type { SVGProps } from "react";

export function EnterKeyGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M30 3h36a4 4 0 0 1 4 4v58a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V37a4 4 0 0 1 4-4h20V7a4 4 0 0 1 4-4Z" />
      <path d="M52 22v26H22" strokeLinecap="round" />
      <path d="M30 40l-8 8 8 8" strokeLinecap="round" />
    </svg>
  );
}

export function MouseGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 58 72" fill="none" stroke="currentColor" strokeWidth="3.2" aria-hidden="true" {...props}>
      <rect x="2" y="2" width="54" height="68" rx="27" />
      <path d="M29 14v24" strokeLinecap="round" />
      <path d="M22 21l7-7 7 7M22 31l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowGlyph({ direction, ...props }: SVGProps<SVGSVGElement> & { direction: "left" | "right" }) {
  const flip = direction === "right" ? "matrix(-1 0 0 1 56 0)" : undefined;
  return (
    <svg viewBox="0 0 56 106" aria-hidden="true" {...props}>
      <g transform={flip}>
        <path d="M48 4v98" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M4 53L48 4v98Z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M10 53L44 16v74Z" fill="currentColor" />
      </g>
    </svg>
  );
}

export function ResumeGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5L13 3.5ZM7 12v1.8h10V12H7Zm0 3.6v1.8h10v-1.8H7Zm0-7.2v1.8h4V8.4H7Z" />
    </svg>
  );
}

export function MailGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
