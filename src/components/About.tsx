import * as React from "react";

type AboutProps = {
  data?: unknown;
  image?: unknown;
};

const About: React.FC<AboutProps> = ({ data, image }) => {
  return (
    <section style={{ padding: "2rem 0" }}>
      <h2>About</h2>
      <p style={{ marginTop: 8 }}>
        Short about blurb. {/* Replace with rich text renderer later */}
      </p>
      {data || image ? null : (
        <small style={{ opacity: 0.7 }}>TODO: wire Contentful about</small>
      )}
    </section>
  );
};

export default About;
