import * as React from "react";

type ContactProps = {
  data?: unknown;
};

const Contact: React.FC<ContactProps> = ({ data }) => {
  return (
    <section style={{ padding: "2rem 0" }}>
      <h2>Contact</h2>
      <p>
        Say hi at <a href="mailto:hello@example.com">hello@example.com</a>
      </p>
      {data ? null : (
        <small style={{ opacity: 0.7 }}>TODO: wire Contentful contact</small>
      )}
    </section>
  );
};

export default Contact;
