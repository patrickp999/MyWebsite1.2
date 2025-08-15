import * as React from "react";
import { Link } from "gatsby";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "../styles/components/nav.css";
import "./Menu"; // ensure TS includes the file during build

// If you have a config, import it. Otherwise scaffold:
const DEFAULT_LINKS = [
  { url: "#about", name: "About" },
  { url: "#work", name: "Work" },
  { url: "#contact", name: "Contact" },
];

const NAV_HEIGHT = 72;
const DELTA = 5;

type NavProps = {
  navLinks?: { url: string; name: string }[];
  resumeHref?: string;
  logoText?: string;
};

export const Nav: React.FC<NavProps> = ({
  navLinks = DEFAULT_LINKS,
  resumeHref = "/Resume.pdf",
  logoText = "Patrick Puga",
}) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState<
    "none" | "up" | "down"
  >("none");
  const lastTop = React.useRef(0);

  // Body blur toggling (replaces Helmet)
  React.useEffect(() => {
    if (menuOpen) document.body.classList.add("blur");
    else document.body.classList.remove("blur");
    return () => document.body.classList.remove("blur");
  }, [menuOpen]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50); // small delay to avoid FOUC
    return () => clearTimeout(t);
  }, []);

  // Scroll behavior
  React.useEffect(() => {
    const onScroll = () => {
      if (window.innerWidth <= 900) return;

      const fromTop = window.scrollY;
      if (Math.abs(lastTop.current - fromTop) <= DELTA || menuOpen) return;

      if (fromTop < DELTA) {
        setScrollDirection("none");
      } else if (fromTop > lastTop.current && fromTop > NAV_HEIGHT) {
        if (scrollDirection !== "down") setScrollDirection("down");
      } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
        if (scrollDirection !== "up") setScrollDirection("up");
      }
      lastTop.current = fromTop;
    };

    const onKey = (e: KeyboardEvent) => {
      if (menuOpen && (e.key === "Escape" || e.key === "Esc"))
        setMenuOpen(false);
    };

    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, scrollDirection]);

  const headerClasses = [
    "nav-header",
    scrollDirection !== "none" ? "is-scrolled" : "",
    scrollDirection === "down" ? "hide" : "",
    scrollDirection === "up" ? "shadow" : "",
  ].join(" ");
  return (
    <>
      <header className={headerClasses} role="banner">
        <div className="nav-wrap">
          <div className="nav-bar" aria-label="Primary">
            {/* Desktop links */}
            <div className="nav-right">
              <nav className="nav-links" aria-label="Section links">
                <ol className="nav-list">
                  <TransitionGroup component={null}>
                    {mounted &&
                      [
                        // 1) normal links first…
                        ...navLinks.map(({ url, name }) => ({
                          kind: "link" as const,
                          url,
                          name,
                        })),
                        // 2) then a synthetic "resume" item so it animates last
                        { kind: "resume" as const, name: "Resume" },
                      ].map((item, i) => (
                        <CSSTransition
                          key={item.kind === "link" ? item.name : "resume"}
                          classNames="fadelink"
                          timeout={{ appear: 1200, enter: 1200, exit: 300 }}
                          appear
                        >
                          <li
                            className="nav-item"
                            style={{ transitionDelay: `${i * 300}ms` }} // resume gets the last delay
                          >
                            {item.kind === "link" ? (
                              item.url.startsWith("#") ? (
                                <a className="nav-link" href={item.url}>
                                  {item.name}
                                </a>
                              ) : (
                                <Link className="nav-link" to={item.url}>
                                  {item.name}
                                </Link>
                              )
                            ) : (
                              <a
                                className="resume-link"
                                href={resumeHref}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                // (no extra delay here — it already uses i * 300ms)
                              >
                                Resume
                              </a>
                            )}
                          </li>
                        </CSSTransition>
                      ))}
                  </TransitionGroup>
                </ol>
              </nav>

              {/* Hamburger (mobile) */}
              <TransitionGroup component={null}>
                {mounted && (
                  <CSSTransition
                    key="hamburger"
                    classNames="fadelink"
                    timeout={2000}
                    appear
                  >
                    <button
                      className="hamburger"
                      style={{
                        transitionDelay: "300ms",
                      }}
                      aria-label="Toggle menu"
                      aria-expanded={menuOpen}
                      onClick={() => setMenuOpen((v) => !v)}
                    >
                      <span className="hamburger-box">
                        <span className="hamburger-inner" />
                      </span>
                    </button>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={navLinks}
        resumeHref={resumeHref}
      />
    </>
  );
};

export default Nav;

// Local import to avoid circular default export issues
import { Menu } from "./Menu";
