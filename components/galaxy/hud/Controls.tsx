import type { MouseEvent } from "react";
import { interfaceCopy } from "@/lib/galaxy/content";
import { ArrowGlyph, EnterKeyGlyph, MouseGlyph } from "./glyphs";

function pointer(action: () => void) {
  return (event: MouseEvent<HTMLButtonElement>) => {
    action();
    if (event.detail > 0) event.currentTarget.blur();
  };
}

type HintsProps = {
  onPress: () => void;
  onScroll: () => void;
  canPress: boolean;
};

export function Hints({ onPress, onScroll, canPress }: HintsProps) {
  return (
    <>
      <button
        type="button"
        className="g-hint g-hint--press"
        onClick={pointer(onPress)}
        disabled={!canPress}
        aria-label="Press Enter to open or close details"
      >
        <span className="g-hint__label g-label">{interfaceCopy.press}</span>
        <EnterKeyGlyph className="g-hint__icon" />
      </button>
      <button type="button" className="g-hint g-hint--scroll" onClick={pointer(onScroll)} aria-label="Scroll to the next screen">
        <span className="g-hint__label g-label">
          <span className="max-sm:hidden">{interfaceCopy.scroll}</span>
          <span className="sm:hidden">{interfaceCopy.swipe}</span>
        </span>
        <MouseGlyph className="g-hint__icon" />
      </button>
    </>
  );
}

type ArrowsProps = {
  noun: string;
  onPrev: () => void;
  onNext: () => void;
};

export function CarouselArrows({ noun, onPrev, onNext }: ArrowsProps) {
  return (
    <>
      <button type="button" className="g-arrow g-arrow--prev" onClick={pointer(onPrev)} aria-label={`Previous ${noun}`}>
        <ArrowGlyph direction="left" />
      </button>
      <button type="button" className="g-arrow g-arrow--next" onClick={pointer(onNext)} aria-label={`Next ${noun}`}>
        <ArrowGlyph direction="right" />
      </button>
    </>
  );
}
