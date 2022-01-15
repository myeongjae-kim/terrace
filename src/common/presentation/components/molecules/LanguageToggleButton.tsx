import { Button } from "@material-ui/core";
import * as React from "react";
import Maybe from "./Maybe";
import { i18n } from "next-i18next";

const toggleLanguage = () => i18n!.changeLanguage(i18n!.language === "ko" ? "en" : "ko");

const LanguageToggleButton: React.FC = () =>
  <Button onClick={toggleLanguage} style={{ minWidth: "initial" }}>
    <Maybe test={!!i18n!.language}>
      <img src={`/static/images/flags/${i18n!.language === "ko" ? "en" : "ko"}.png`} width="20px" />
    </Maybe>
  </Button>;

export default LanguageToggleButton;
