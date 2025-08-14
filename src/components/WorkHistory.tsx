import * as React from "react";

type WorkHistoryProps = {
  data?: unknown;
};

const WorkHistory: React.FC<WorkHistoryProps> = ({ data }) => {
  return (
    <section style={{ padding: "2rem 0" }}>
      <h2>Work History</h2>
      <ul>
        <li>Placeholder work history entry</li>
      </ul>
      {data ? null : (
        <small style={{ opacity: 0.7 }}>
          TODO: wire Contentful work history
        </small>
      )}
    </section>
  );
};

export default WorkHistory;
