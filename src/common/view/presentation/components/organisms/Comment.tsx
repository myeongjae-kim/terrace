import * as React from "react";
import {useTheme, NoSsr} from "@mui/material";

interface Props {
  identifier: string;
}

const Utterances: React.FC<Props> = ({ identifier }) => {
  const theme = useTheme();

  React.useEffect(() => {
    initComment(theme.palette.mode);
  }, [identifier, theme.palette.mode]);

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

const initComment = (paletteType: "light" | "dark") => {
  const utterancesContainer = document.querySelector("#comment-container");
  if (!utterancesContainer) {
    return;
  }
  utterancesContainer.childNodes.forEach(v => { v.remove(); });

  const utterances = document.createElement("script");
  utterances.setAttribute("src", "https://utteranc.es/client.js");
  utterances.setAttribute("repo", "myeongjae-kim/terrace-utterances");
  utterances.setAttribute("issue-term", "pathname");
  utterances.setAttribute("theme", paletteType === "dark" ? "dark-blue" : "github-light");
  utterances.setAttribute("crossorigin", "anonymous");
  utterances.async = true;
  utterancesContainer.appendChild(utterances);
};
