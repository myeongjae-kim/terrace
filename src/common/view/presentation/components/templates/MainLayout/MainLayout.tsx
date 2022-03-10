import {createStyles, makeStyles} from "@mui/styles"; //이거 건들면 깨진다. 나중에 바꿔뵉
import React, {ReactNode} from "react";
import FooterContent from "./FooterContent";
import TopBar from "./TopBar";
import {darkThemeV5} from "../../themes";
import {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    margin: `0 ${theme.spacing(0.5)}`,
    lineHeight: 1.6,
    "& img[src*=\"#shadow\"]": {
      boxShadow: `2px 2px 15px ${theme.palette.mode === "dark" ? "#000" : "#ccc"}`,
    },
    "& img[src*=\"#round\"]": {
      borderRadius: "5px",
    },
    "& img[src*=\"#width-250\"]": {
      width: 250,
    },
    "& img[src*=\"#width-100percent\"]": {
      width: "100%",
    },
    "& img[src*=\"#width-400\"]": {
      width: 400,
    },
    "& p.center": {
      textAlign: "center",
    },
    "& .no-indent": {
      textIndent: 0
    },
    "& blockquote": {
      fontFamily: "Noto Serif KR",
      textIndent: ".5em",
      opacity: .8,
      background: theme.palette.background.paper,
      padding: "15px 20px",
      margin: "0",
      border: `1px solid ${theme.palette.divider} !important`,
      borderRadius: 5,
    },
    "& pre": {
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
      background: darkThemeV5.palette.background.paper,
      padding: 20,
      lineHeight: "1.3em",
      border: `1px solid ${theme.palette.divider} !important`,
      borderRadius: 5,
      overflowY: "auto"
    },
    "& strong, b": {
      fontWeight: 700
    },
    "& a:not([class])": {
      color: theme.palette.primary.main,
      transition: "color 1s ease-out",
      textDecoration: "none",
      "&:hover": {
        color: theme.palette.primary.light
      }
    },
    "& hr": {
      border: 0,
      height: 1,
      background: "#333",
      backgroundImage: `linear-gradient(90deg, ${theme.palette.mode === "dark" ? "#333,#ccc,#333" : "#ccc,#333,#ccc"})`,
      opacity: .7
    },
    "& figure": {
      textAlign: "center",
    },
    "& figcaption": {
      fontSize: "0.8em",
      opacity: 0.7
    },
  },
  footer: {
    flexShrink: 0,
    marginTop: theme.spacing(1.5)
  }
}));

const MainLayout = ({ children }: { children?: ReactNode | undefined }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <TopBar />
      <main className={classes.content}>
        {children}
      </main>
      <footer className={classes.footer}>
        <FooterContent />
      </footer>
    </div>
  );
};

export default MainLayout;
