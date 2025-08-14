import * as React from "react";

type HeroProps = {
  // replace with your real shape later
  data?: unknown;
};

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section style={{ padding: "4rem 0" }}>
      <h1>Hi, I’m Patrick.</h1>
      <p style={{ marginTop: 8 }}>This is the new Gatsby site scaffold.</p>
      {data ? null : (
        <small style={{ opacity: 0.7 }}>TODO: wire Contentful hero</small>
      )}
    </section>
  );
};

export default Hero;
