"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GithubIcon } from "@/components/icons";
import { useGalaxyNavigation } from "@/hooks/useGalaxyNavigation";
import {
  about,
  featuredSkills,
  galaxyExperience,
  galaxyProjects,
  interfaceCopy,
  intro,
} from "@/lib/galaxy/content";
import {
  CAROUSEL_SCREENS,
  isScreenId,
  PANEL_SCREENS,
  SCREEN_LABELS,
  SCREENS,
  screenIndex,
  SOCIAL_SCREENS,
  type ScreenId,
} from "@/lib/galaxy/screens";
import { HomeBanner, SectionBanner } from "./hud/Banner";
import ContactDialog from "./hud/ContactDialog";
import { CarouselArrows, Hints } from "./hud/Controls";
import { ClickToOpen, InfoPanel } from "./hud/OpenFrame";
import SocialRail from "./hud/SocialRail";

const GalaxyCanvas = dynamic(() => import("./scene/GalaxyCanvas"), { ssr: false });

const PANEL_ID = "galaxy-details";

type Items = { projects: number; experience: number };

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

export default function GalaxyExperience() {
  const prefersReduced = useReducedMotion() ?? false;
  const [screen, setScreen] = useState<ScreenId>("home");
  const [items, setItems] = useState<Items>({ projects: 0, experience: 0 });
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState(false);
  const [ready, setReady] = useState(false);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.slice(1);
    /* eslint-disable react-hooks/set-state-in-effect -- the URL is only readable after hydration */
    if (isScreenId(hash)) setScreen(hash);
    if (params.get("open") === "1") setOpen(true);
    if (params.get("still") === "1") setStill(true);
    /* eslint-enable react-hooks/set-state-in-effect */

    const onHash = () => {
      const next = window.location.hash.slice(1);
      if (isScreenId(next)) {
        setScreen(next);
        setOpen(false);
      }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const url = `${window.location.pathname}${window.location.search}#${screen}`;
    if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== url) {
      window.history.replaceState(null, "", url);
    }
  }, [screen]);

  const goTo = useCallback(
    (next: ScreenId) => {
      if (next === screen) return;
      setScreen(next);
      setOpen(false);
    },
    [screen],
  );

  const step = useCallback(
    (direction: 1 | -1, loop = false) => {
      const index = screenIndex(screen) + direction;
      const target = loop ? wrap(index, SCREENS.length) : Math.min(SCREENS.length - 1, Math.max(0, index));
      goTo(SCREENS[target]);
    },
    [screen, goTo],
  );

  const changeItem = useCallback(
    (direction: 1 | -1) => {
      if (screen !== "projects" && screen !== "experience") return;
      const length = screen === "projects" ? galaxyProjects.length : galaxyExperience.length;
      setItems((current) => ({ ...current, [screen]: wrap(current[screen] + direction, length) }));
    },
    [screen],
  );

  const hasPanel = PANEL_SCREENS.includes(screen);

  useGalaxyNavigation({
    enabled: !contact,
    onStep: (direction) => step(direction),
    onItem: changeItem,
    onToggle: () => hasPanel && setOpen((value) => !value),
    onClose: () => {
      if (contact) setContact(false);
      else setOpen(false);
    },
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const handleReady = useCallback(() => {
    setReady(true);
    (window as Window & { __galaxyReady?: boolean }).__galaxyReady = true;
  }, []);

  const sceneMotion = useMemo(() => ({ reduced: prefersReduced, frozen: still }), [prefersReduced, still]);
  const instant = prefersReduced || still;
  const project = galaxyProjects[items.projects];
  const job = galaxyExperience[items.experience];
  const itemKey = screen === "projects" ? items.projects : screen === "experience" ? items.experience : 0;

  return (
    <div ref={rootRef} className="galaxy" data-galaxy-screen={screen}>
      <GalaxyCanvas screen={screen} motion={sceneMotion} onReady={handleReady} eventSource={rootRef} />

      <AnimatePresence>
        {!ready && (
          <motion.div className="g-loader" exit={{ opacity: 0 }} transition={{ duration: instant ? 0 : 0.6 }}>
            <p className="g-loader__text g-display" role="status">
              Launching
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" className="g-hud">
        <nav aria-label="Screens" className="sr-only">
          <ul>
            {SCREENS.map((id) => (
              <li key={id}>
                <button type="button" onClick={() => goTo(id)} aria-current={id === screen ? "page" : undefined}>
                  {SCREEN_LABELS[id]}
                </button>
              </li>
            ))}
            <li>
              <Link href="/">Main portfolio</Link>
            </li>
          </ul>
        </nav>

        <button type="button" className="g-contact g-label" onClick={() => setContact(true)}>
          {interfaceCopy.contact}
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={screen}
            className="g-screen"
            initial={instant ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={instant ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -24 }}
            transition={{ duration: instant ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {screen === "home" && <HomeBanner />}
            {screen === "about" && <SectionBanner title={interfaceCopy.aboutTitle} variant="about" />}
            {screen === "projects" && <SectionBanner title={interfaceCopy.projectsTitle} variant="projects" />}
            {screen === "skills" && <SectionBanner title={interfaceCopy.skillsTitle} variant="skills" />}
            {screen === "experience" && <SectionBanner title={interfaceCopy.experienceTitle} variant="experience" />}

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={itemKey}
                className="g-screen"
                initial={instant ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: instant ? 0 : 0.25 }}
              >
                {screen === "home" && (
                  <p className="g-subtitle g-subtitle--home g-display" data-galaxy-subtitle="">
                    I am {intro.firstName}
                  </p>
                )}
                {screen === "about" && (
                  <>
                    <h2 className="g-subtitle g-subtitle--about g-label g-glow-text" data-galaxy-subtitle="">
                      {about.role}
                    </h2>
                    <p className="g-date g-label">{about.facts.join(" · ")}</p>
                  </>
                )}
                {screen === "projects" && (
                  <h2 className="g-subtitle g-subtitle--projects g-label g-glow-text" data-galaxy-subtitle="">
                    Project{items.projects + 1} : {project.title}
                  </h2>
                )}
                {screen === "skills" && (
                  <h2 className="g-subtitle g-subtitle--skills g-label g-glow-text" data-galaxy-subtitle="">
                    {interfaceCopy.skillsSubtitle}
                  </h2>
                )}
                {screen === "experience" && (
                  <>
                    <h2 className="g-subtitle g-subtitle--experience g-label g-glow-text" data-galaxy-subtitle="">
                      {job.company} {job.role}
                    </h2>
                    <p className="g-date g-label">{job.duration}</p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {CAROUSEL_SCREENS.includes(screen) && (
              <CarouselArrows
                noun={screen === "projects" ? "project" : "experience"}
                onPrev={() => changeItem(-1)}
                onNext={() => changeItem(1)}
              />
            )}

            {screen === "skills" && (
              <ul className="g-skills" aria-label="Skills" data-galaxy-scrollable="">
                {featuredSkills.map((skill) => (
                  <li key={skill} className={`g-skills__cell ${skill.length > 10 ? "g-skills__cell--long" : ""}`}>
                    {skill}
                  </li>
                ))}
              </ul>
            )}

            {hasPanel && (
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <InfoPanel
                    key={`panel-${itemKey}`}
                    id={PANEL_ID}
                    label={`${SCREEN_LABELS[screen]} details`}
                    home={screen === "home"}
                    dense={screen === "about" || screen === "experience" || (screen === "projects" && project.description.length > 330)}
                    onClose={() => setOpen(false)}
                  >
                    {screen === "home" && <p>{intro.about}</p>}
                    {screen === "about" && (
                      <>
                        <p>{about.summary}</p>
                        <p className="g-panel__meta">{about.status}</p>
                        {about.education.map((line) => (
                          <p key={line} className="g-panel__note">
                            {line}
                          </p>
                        ))}
                      </>
                    )}
                    {screen === "projects" && (
                      <>
                        {project.github && (
                          <a className="g-panel__icon" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`}>
                            <GithubIcon />
                          </a>
                        )}
                        <p>{project.description}</p>
                        {project.metric && <p className="g-panel__meta">{project.metric}</p>}
                      </>
                    )}
                    {screen === "experience" && (
                      <>
                        <p className="g-panel__meta">{job.location}</p>
                        <ul className="g-panel__list">
                          {job.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </InfoPanel>
                ) : (
                  <motion.div
                    key="closed"
                    className="g-screen"
                    initial={instant ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: instant ? 0 : 0.2 }}
                  >
                    <ClickToOpen home={screen === "home"} controls={PANEL_ID} onOpen={() => setOpen(true)} />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </motion.div>
        </AnimatePresence>

        {SOCIAL_SCREENS.includes(screen) && <SocialRail />}

        <Hints canPress={hasPanel} onPress={() => setOpen((value) => !value)} onScroll={() => step(1, true)} />
      </main>

      <AnimatePresence>{contact && <ContactDialog onClose={() => setContact(false)} />}</AnimatePresence>
    </div>
  );
}
