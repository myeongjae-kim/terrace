import * as React from "react";

const DisplayProps = <T extends unknown>(props: T) =>
  <div style={{ margin: "1rem 0" }}>
    <h3 style={{ fontFamily: "monospace" }} />
    <pre
      style={{
        background: "#f6f8fa",
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> ={" "}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

export default DisplayProps;