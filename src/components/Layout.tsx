import * as React from "react";
import "../styles/theme.css";
import "../styles/global.css";
import Nav from "./Nav";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div id="root">
      <header className="header">
        <div className="container">
          {/* Sticky nav lives outside container to span full width; we render it separately */}
        </div>
      </header>

      <Nav />

      <main id="content" className="container main">
        {children}
      </main>

      <footer className="footer">
        <div className="container">
          <small>© {new Date().getFullYear()} Patrick Puga</small>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
