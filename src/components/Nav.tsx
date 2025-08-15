import * as React from "react";
import { Link } from "gatsby";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "../styles/components/nav.css";
import "./Menu";
import { Menu } from "./Menu";
import {
  DEFAULT_LINKS,
  DELTA,
  NAV_HEIGHT,
  RESUME_HREF,
} from "../utils/constants";
import { useScrollDirection } from "../utils/useScrollDirection";

export const Nav: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  // Body blur toggling (replaces Helmet)
  React.useEffect(() => {
    if (menuOpen) document.body.classList.add("blur");
    else document.body.classList.remove("blur");
    return () => document.body.classList.remove("blur");
  }, [menuOpen]);

  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50); // small delay to avoid FOUC
    return () => clearTimeout(t);
  }, []);

  // ⬇️ NEW: scroll direction from the hook
  const { scrollDirection } = useScrollDirection({
    delta: DELTA,
    navHeight: NAV_HEIGHT,
    disabled: menuOpen, // don’t change header while menu is open
    mobileCutoff: 640, // (optional) align with your phone breakpoint
  });

  const headerClasses = [
    "nav-header",
    scrollDirection !== "none" ? "is-scrolled" : "",
    scrollDirection === "down" ? "hide" : "",
    scrollDirection === "up" ? "shadow" : "",
  ].join(" ");

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (menuOpen && (e.key === "Escape" || e.key === "Esc"))
        setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 640 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

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
                        ...DEFAULT_LINKS.map(({ url, name }) => ({
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
                                href={RESUME_HREF}
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
        links={DEFAULT_LINKS}
        resumeHref={RESUME_HREF}
      />
    </>
  );
};

export default Nav;
