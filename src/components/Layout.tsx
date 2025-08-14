import * as React from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header style={{ padding: "1rem 0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem" }}>
          <strong>My Website</strong>
        </div>
      </header>
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 1rem" }}>
        {children}
      </main>
      <footer
        style={{
          maxWidth: 960,
          margin: "2rem auto",
          padding: "0 1rem",
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
