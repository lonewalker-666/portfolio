export type GradientStop = readonly [stop: number, color: string];

export const SKY_GRADIENTS: readonly (readonly GradientStop[])[] = [
  [
    [0, "#11021e"],
    [0.22, "#1e0340"],
    [0.4, "#2b0558"],
    [0.6, "#261d68"],
    [1, "#110a36"],
  ],
  [
    [0, "#0a0620"],
    [0.25, "#1a0c45"],
    [0.45, "#3a1260"],
    [0.62, "#2a1c6e"],
    [1, "#0d0a32"],
  ],
  [
    [0.12, "#070708"],
    [0.2, "#121a36"],
    [0.36, "#1a2a55"],
    [0.55, "#16496a"],
    [1, "#0e2148"],
  ],
  [
    [0, "#76825f"],
    [0.25, "#5e6862"],
    [0.48, "#4a4d5e"],
    [0.7, "#3b2346"],
    [1, "#2b1238"],
  ],
  [
    [0, "#1b1450"],
    [0.25, "#30156a"],
    [0.45, "#3d2a80"],
    [0.65, "#2f1d66"],
    [1, "#1b0f40"],
  ],
];

export const HUD = {
  lavender: "#cdb5ff",
  lavenderSoft: "#c8bbfc",
  glow: "#8b5cf6",
  ink: "#2c0c64",
};
