/* eslint-disable @typescript-eslint/no-var-requires */

import { ThemeProvider } from "@mui/material/styles";
import {DefaultSeo} from "next-seo";
import Head from "next/head";
import React from "react";
import ReactGA from "react-ga";
import {DOMAIN, GA_TRACKING_CODE} from "src/common/constants/Constants";
import {MainLayout} from "src/common/view/presentation/components/templates";
import {
  brightThemeV5,
  darkThemeV5,
} from "src/common/view/presentation/components/themes";
import {isServer} from "src/util";
import {NextComponentType} from "next";
import {AppContext, AppInitialProps, AppProps} from "next/app";
import ColorModeChangeButton from "src/common/view/presentation/components/molecules/ColorModeChangeButton";
import {usePersistentDarkModePreference} from "src/common/view/presentation/hooks/usePersistentDarkModePreferences";
import PrismjsThemeSupport from "src/common/view/presentation/components/molecules/PrismjsThemeSupport";
import {isEditablePage} from "../src/util/isEditablePage";
import {useNProgressLoader} from "src/common/view/presentation/hooks/useNProgressLoader";
import "src/common/view/presentation/styles/nprogress.css";
import createEmotionCache from "../src/util/createEmotionCache";
import {EmotionCache} from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import {CssBaseline} from "@mui/material";

const useInit = () => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);
};

ReactGA.initialize(GA_TRACKING_CODE);
const useEveryUpdate = () => {
  React.useEffect(() => {
    if (isServer()) {
      return;
    }
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });
};

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: NextComponentType<AppContext, AppInitialProps, MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props;

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

  const theme = React.useMemo(() => prefersDarkMode ? darkThemeV5 : brightThemeV5, [
    prefersDarkMode,
  ]);

  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
};

export default MyApp;
