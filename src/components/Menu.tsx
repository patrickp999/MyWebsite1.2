import * as React from "react";
import { Link } from "gatsby";
import "../styles/components/menu.css";

type Props = {
  open: boolean;
  onClose: () => void;
  links: { url: string; name: string }[];
  resumeHref: string;
};

export const Menu: React.FC<Props> = ({ open, onClose, links, resumeHref }) => {
  React.useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <>
      <div
        className={`menu-overlay ${open ? "open" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`menu-drawer ${open ? "open" : ""}`}
        aria-hidden={!open}
        aria-label="Mobile menu"
      >
        <div className="menu-head">
          <strong style={{ color: "var(--text)" }}>Menu</strong>
          <button aria-label="Close menu" onClick={onClose}>
            ✕
          </button>
        </div>
        <nav className="menu-body">
          {links.map(({ url, name }) =>
            url.startsWith("#") ? (
              <a key={name} href={url} onClick={onClose} className="menu-link">
                {name}
              </a>
            ) : (
              <Link key={name} to={url} onClick={onClose} className="menu-link">
                {name}
              </Link>
            )
          )}
          <a
            className="menu-link"
            href={resumeHref}
            target="_blank"
            rel="nofollow noopener noreferrer"
            onClick={onClose}
          >
            Resume ↗
          </a>
        </nav>
      </aside>
    </>
  );
};
