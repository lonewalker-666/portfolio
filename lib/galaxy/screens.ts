export const SCREENS = ["home", "about", "projects", "skills", "experience"] as const;

export type ScreenId = (typeof SCREENS)[number];

export const SCREEN_LABELS: Record<ScreenId, string> = {
  home: "Home",
  about: "About",
  projects: "Projects",
  skills: "Skills",
  experience: "Experience",
};

export function isScreenId(value: string): value is ScreenId {
  return (SCREENS as readonly string[]).includes(value);
}

export function screenIndex(id: ScreenId) {
  return SCREENS.indexOf(id);
}

export const CAROUSEL_SCREENS: ScreenId[] = ["projects", "experience"];
export const PANEL_SCREENS: ScreenId[] = ["home", "about", "projects", "experience"];
export const SOCIAL_SCREENS: ScreenId[] = ["home", "about", "skills"];
