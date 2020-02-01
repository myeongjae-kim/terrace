import styled from "@emotion/styled";
import { createStyles, CssBaseline, makeStyles, Theme } from '@material-ui/core';
import { Button } from "@material-ui/core";
import React from 'react';
import { SignOutButton } from '../../molecules';
import FooterContent from './FooterContent';
import TopBar from './TopBar';

const useStyles = makeStyles((theme: Theme) => createStyles({
  rootContainer: {
    height: "100vh",
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1,
    margin: `0 ${theme.spacing(0.5)}px`,
    lineHeight: 1.6,
    '& img[src*="#shadow"]': {
      boxShadow: "2px 2px 15px #ccc",
    },
    '& img[src*="#round"]': {
      borderRadius: "5px",
    },
    '& img[src*="#width-250"]': {
      width: 250,
    },
    '& img[src*="#width-100percent"]': {
      width: "100%",
    },
    '& img[src*="#width-400"]': {
      width: 400,
    },
    '& p.center': {
      textAlign: "center",
    },
    '& .no-indent': {
      textIndent: 0
    },
    '& blockquote': {
      fontFamily: 'Noto Serif KR',
      textIndent: ".5em",
      opacity: .8,
      background: '#f5f5f5',
      padding: '15px 20px',
      margin: '0 20px',
      border: '1px solid #e0e0e0 !important',
      borderRadius: 5,
    },
    '& pre': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      background: '#f5f5f5',
      padding: 20,
      lineHeight: '1.3em',
      border: '1px solid #e0e0e0 !important',
      borderRadius: 5,
    },
    '& strong, b': {
      fontWeight: 700
    },
    '& a:not([class])': {
      color: theme.palette.primary.main,
      transition: "color 1s ease-out",
      textDecoration: 'none',
      '&:hover': {
        color: theme.palette.primary.light
      }
    },
    '& hr': {
      border: 0,
      height: 1,
      background: '#333',
      backgroundImage: 'linear-gradient(90deg, #ccc,#333, #ccc)',
      opacity: .7
    },
    '& figure': {
      textAlign: 'center',
    },
    '& figcaption': {
      fontSize: '0.8em',
      opacity: 0.7
    },
    '& code': {
      background: 'rgba(83, 173, 241, 0.1)'
    },
    '& pre code': {
      background: 'initial'
    }
  },
  footer: {
    flexShrink: 0,
  }
}));

const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3px;
  border: 0;
  color: white;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.rootContainer}>
      <CssBaseline />
      <TopBar />
      <SignOutButton />
      <StyledButton>Emotion Styled</StyledButton>
      <main className={classes.content}>
        {children}
      </main>
      <footer className={classes.footer}>
        <FooterContent />
      </footer>
    </div>
  );
}

export default MainLayout;