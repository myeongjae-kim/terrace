/* eslint-disable @typescript-eslint/no-var-requires */

import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider} from "@material-ui/styles";
import {DefaultSeo} from "next-seo";
import Head from "next/head";
import React from "react";
import ReactGA from "react-ga";
import {DOMAIN} from "src/common/constants/Constants";
import {MainLayout} from "src/common/view/presentation/components/templates";
import {brightTheme, darkTheme} from "src/common/view/presentation/components/themes";
import {isServer} from "src/util";
import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppProps} from "next/app";
import ColorModeChangeButton from "src/common/view/presentation/components/molecules/ColorModeChangeButton";
import {usePersistentDarkModePreference} from "src/common/view/presentation/hooks/usePersistentDarkModePreferences";
import PrismjsThemeSupport from "src/common/view/presentation/components/molecules/PrismjsThemeSupport";
import Axios from "axios";
import {isEditablePage} from "../src/util/isEditablePage";
import {useNProgressLoader} from "src/common/view/presentation/hooks/useNProgressLoader";
import "src/common/view/presentation/styles/nprogress.css";

ReactGA.initialize("UA-126240406-1");

const publicToken = "5f5da4885cc60c4007a770e20bcb499584306df76f7024786943770d87d10ec647588ed508a328726c03144cecb04e65377865e992cf557c9398f280355f1b5d66816bd18b466c4c973d90a93c5a04b3635a518688b2e49c468eca9c92bf0098dc6851481cd51bc9d60b33c4b7c65e81885b6dd53990b7e0397451b59cd000e6";
Axios.defaults.headers.common["Authorization"] = "Bearer " + publicToken;

const useInit = () => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
};

const useEveryUpdate = () => {
  React.useEffect(() => {
    if (isServer()) {
      return;
    }
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });
};

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
  router,
}) => {
  useInit();
  useNProgressLoader();
  useEveryUpdate();

  // first rendering
  React.useEffect(() => {
    router.beforePopState(() => {
      if (isEditablePage(router.asPath)) {
        return confirm("정말 이 페이지에서 나가시겠어요?");
      }
      return true;
    });
  }, [router]);

  // every update
  React.useEffect(() => {
    if (window && isEditablePage(router.asPath)) {
      window.onbeforeunload = (e: any) => {
        e.returnValue = "정말 이 페이지에서 나가시겠어요?";
      };
    } else {
      window.onbeforeunload = null;
    }
  });

  const [prefersDarkMode, toggleColorMode] = usePersistentDarkModePreference(
    "@myeongjae.kim/PREFERS_DARK_MODE"
  );

  const theme = React.useMemo(() => prefersDarkMode ? darkTheme : brightTheme, [
    prefersDarkMode,
  ]);

  return (
    <>
      <Head>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <title>:: 김명재, Myeongjae Kim</title>
      </Head>

      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "ko_KR",
          url: DOMAIN,
          site_name: "김명재, Myeongjae Kim",
          images: [
            {
              url: "https://cdn.myeongjae.kim/blog/default-thumbnail.png",
              width: 400,
              height: 400,
              alt: "김명재, Myeongjae Kim",
            },
          ],
        }}
        twitter={{
          handle: "@myeongjae_kim",
          site: "@myeongjae_kim",
          cardType: "summary",
        }}
      />
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PrismjsThemeSupport />

        <MainLayout>
          <ColorModeChangeButton
            isDark={prefersDarkMode}
            toggle={toggleColorMode}
          />
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
