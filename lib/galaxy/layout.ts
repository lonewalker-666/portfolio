export const REF_WIDTH = 1728;
export const REF_HEIGHT = 1117;
export const REF_ASPECT = REF_WIDTH / REF_HEIGHT;

export const WORLD_HEIGHT = 10;
export const CAMERA_FOV = 30;
export const CAMERA_DISTANCE = WORLD_HEIGHT / 2 / Math.tan((CAMERA_FOV * Math.PI) / 360);

const PX = WORLD_HEIGHT / REF_HEIGHT;

export function refY(px: number) {
  return WORLD_HEIGHT / 2 - px * PX;
}

export function refX(px: number) {
  return (px - REF_WIDTH / 2) * PX;
}

export function refSize(px: number) {
  return px * PX;
}

export function depthScale(z: number) {
  return (CAMERA_DISTANCE - z) / CAMERA_DISTANCE;
}

export function atDepth(xPx: number, yPx: number, z: number): [number, number, number] {
  const k = depthScale(z);
  return [refX(xPx) * k, refY(yPx) * k, z];
}

export const PLANET = {
  crestPx: 655,
  radiusPx: 652,
};

export function stageScale(aspect: number) {
  return Math.min(1, Math.max(0.55, aspect / REF_ASPECT));
}

export function planetFrame(aspect: number) {
  const s = stageScale(aspect);
  const radius = refSize(PLANET.radiusPx) * s;
  const centerBelowBottom = refSize(PLANET.crestPx + PLANET.radiusPx - REF_HEIGHT) * s;
  const centerY = -WORLD_HEIGHT / 2 - centerBelowBottom;
  return { scale: s, radius, centerY, crestY: centerY + radius };
}
