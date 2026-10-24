import { interfaceCopy } from "@/lib/galaxy/content";

export function HomeBanner() {
  return (
    <header className="g-home-banner">
      <div className="g-home-banner__row" aria-hidden="true">
        <span className="g-bar" />
        <span className="g-kicker">{interfaceCopy.kicker}</span>
      </div>
      <h1 className="g-display g-home-banner__title">{interfaceCopy.greeting}</h1>
      <div className="g-home-banner__row">
        <p className="g-kicker">{interfaceCopy.kicker}</p>
        <span className="g-bar" aria-hidden="true" />
      </div>
    </header>
  );
}

type SectionBannerProps = {
  title: string;
  variant: "about" | "projects" | "skills" | "experience";
};

export function SectionBanner({ title, variant }: SectionBannerProps) {
  return (
    <header className={`g-section-banner g-section-banner--${variant}`}>
      <span className="g-bar" aria-hidden="true" />
      <h1 className="g-display g-section-banner__title">{title}</h1>
      <span className="g-bar" aria-hidden="true" />
    </header>
  );
}
