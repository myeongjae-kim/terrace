import { NoSsr, useTheme, PaletteType } from "@material-ui/core";
import * as React from "react";

interface Props {
  identifier: string;
}

const Utterances: React.FC<Props> = ({ identifier }) => {
  const theme = useTheme();
  console.log("\n\n\nidentifier: ", identifier);

  React.useEffect(() => {
    initComment(theme.palette.type);
  }, [identifier, theme.palette.type]);

  return <div id="comment-container" style={{
    margin: "auto"
  }} />;
};

const Comment: React.FC<Props> = (props) => {
  return <NoSsr>
    <Utterances {...props} />
  </NoSsr>;
};

export default Comment;

const initComment = (paletteType: PaletteType) => {
  const utterancesContainer = document.querySelector("#comment-container");
  if (!utterancesContainer) {
    return;
  }
  utterancesContainer.childNodes.forEach(v => { v.remove(); });

  const utterances = document.createElement("script");
  utterances.setAttribute("src", "https://utteranc.es/client.js");
  utterances.setAttribute("repo", "myeongjae-kim/terrace-utterances");
  utterances.setAttribute("issue-term", "pathname");
  utterances.setAttribute("theme", paletteType === "dark" ? "photon-dark" : "github-light");
  utterances.setAttribute("crossorigin", "anonymous");
  utterances.async = true;
  utterancesContainer.appendChild(utterances);
};
