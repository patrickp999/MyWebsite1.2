import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "../styles/components/hero.css";
import {
  DEFAULT_LINKS,
  EXTRA_BUFFER_MS,
  FADE_DURATION,
  HERO_FALLBACK,
  LINK_STAGGER_MS,
} from "../utils/constants"; // used to compute nav timing

export type HeroContent = {
  greeting?: string;
  name: string;
  subtitle: string;
  blurb: string;
};

type HeroProps = {
  data?: Partial<HeroContent>;
};

export const Hero: React.FC<HeroProps> = ({ data }) => {
  const [mounted, setMounted] = React.useState(false);
  const content: HeroContent = { ...HERO_FALLBACK, ...data };
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50); // tiny delay to avoid FOUC
    return () => clearTimeout(t);
  }, []);

  // +1 accounts for the Resume item animating after the links
  const navItemCount = DEFAULT_LINKS.length + 1;
  const baseDelay = isMobile
    ? 0
    : navItemCount * LINK_STAGGER_MS + EXTRA_BUFFER_MS;

  const items = [
    <h1
      key="name"
      className="hero-name"
      style={{ transitionDelay: `${baseDelay + 100}ms` }}
    >
      {content.name}
    </h1>,
    <hr
      key="rule"
      className="hero-divider"
      style={{ transitionDelay: `${baseDelay + 200}ms` }}
    />,
    <h2
      key="title"
      className="hero-title"
      style={{ transitionDelay: `${baseDelay + 300}ms` }}
    >
      {content.subtitle}
    </h2>,
    <p
      key="blurb"
      className="hero-blurb"
      style={{ transitionDelay: `${baseDelay + 400}ms` }}
    >
      {content.blurb}
    </p>,
  ];

  return (
    <section id="hero" className="hero-container" aria-label="Intro">
      <div className="hero-inner">
        <TransitionGroup component={null}>
          {mounted &&
            items.map((el, i) => (
              <CSSTransition
                key={i}
                classNames="fade"
                timeout={{
                  appear: FADE_DURATION.appear,
                  enter: FADE_DURATION.enter,
                  exit: FADE_DURATION.exit,
                }}
                appear
              >
                {el}
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>
    </section>
  );
};

export default Hero;
