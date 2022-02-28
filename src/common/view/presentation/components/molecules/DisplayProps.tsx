import * as React from "react";
import {useTheme} from "@mui/system";

const DisplayProps = <T,>(props: T) => {
  const theme = useTheme();
  return <div style={{margin: "1rem 0"}}>
    <h3 style={{fontFamily: "monospace"}}/>
    <pre
      style={{
        background: theme.palette.background.paper,
        fontSize: ".65rem",
        padding: ".5rem",
      }}
    >
      <strong>props</strong> ={" "}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>;
};

export default DisplayProps;
