import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { styled } from 'src/util';
import { SignOutButton } from '../../molecules';
import FooterContent from './FooterContent';
import TopBar from './TopBar';

const RootDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const CommonStyledDiv = styled.div`${({ theme }) => `
    flex-grow: 1;
    margin: 0 ${theme.spacing(0.5)}px;
    line-height: 1.6;
    & img[src*="#shadow"] {
      box-shadow: 2px 2px 15px #ccc;
    }
    & img[src*="#round"] {
      border-radius: 5px;
    }
    & img[src*="#width-250"] {
      width: 250px;
    }
    & img[src*="#width-100percent"] {
      width: 100%;
    }
    & img[src*="#width-400"] {
      width: 400px;
    }
    & p.center {
      text-align: center;
    }
    & .no-indent {
      text-indent: 0;
    }
    & blockquote {
      font-family: 'Noto Serif KR';
      text-indent: .5em;
      opacity: .8;
      background: #f5f5f5;
      padding: 15px 20px;
      margin: 0 20px;
      border: 1px solid #e0e0e0 !important;
      border-radius: 5px;
    }
    & pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      background: #f5f5f5;
      padding: 20px;
      line-height: 1.3em;
      border: 1px solid #e0e0e0 !important;
      border-radius: 5px;
    }
    & strong, b {
      font-weight: 700
    }
    & a:not([class]) {
      color: ${theme.palette.primary.main};
      transition: color 1s ease-out;
      text-decoration: none;
      &:hover {
        color: ${theme.palette.primary.light};
      }
    }
    & hr {
      border: 0;
      height: 1px;
      background: #333;
      background-image: linear-gradient(90deg, #ccc,#333, #ccc);
      opacity: .7;
    }
    & figure {
      text-align: center;
    }
    & figcaption {
      font-size: 0.8em;
      opacity: 0.7;
    }
    & code {
      background: rgba(83, 173, 241, 0.1);
    }
    & pre code {
      background: initial;
    }
  `}
`;

const Footer = styled.footer`
  flex-shrink: 0;
`

const MainLayout: React.FC = ({ children }) => {
  return (
    <RootDiv>
      <CssBaseline />
      <TopBar />
      <SignOutButton />
      <CommonStyledDiv>
        {children}
      </CommonStyledDiv>
      <Footer>
        <FooterContent />
      </Footer>
    </RootDiv>
  );
}

export default MainLayout;