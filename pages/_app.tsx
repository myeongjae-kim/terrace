/* eslint-disable @typescript-eslint/no-var-requires */

import {ThemeProvider} from "@mui/material/styles";
import createSagaMiddleware from "@redux-saga/core";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import {DefaultSeo} from "next-seo";
import Head from "next/head";
import {SnackbarProvider} from "notistack";
import React from "react";
import ReactGA from "react-ga";
import {Provider as ReduxStoreProvider} from "react-redux";
import {AnyAction, applyMiddleware, createStore, Middleware, Store,} from "redux";
import {DOMAIN} from "src/common/constants/Constants";
import {MainLayout} from "src/common/presentation/components/templates";
import {lightTheme, darkTheme} from "src/common/presentation/components/themes";
import ConfirmContainer from "src/common/presentation/container/molecules/ConfirmContainer";
import SnackbarContainer from "src/common/presentation/container/molecules/SnackbarContainer";
import NotificationCenterContainer from "src/common/presentation/container/organisms/NotificationCenterContainer";
import {setPaths} from "src/common/presentation/state-module/common";
import {rootReducer, rootSaga, RootState,} from "src/common/presentation/state-module/root";
import {isServer} from "src/util";
import {NextComponentType} from "next";
import App, {AppContext, AppInitialProps, AppProps} from "next/app";
import ColorModeChangeButton from "src/common/presentation/components/molecules/ColorModeChangeButton";
import {usePersistentDarkModePreference} from "src/common/domain/model/usePersistentDarkModePreferences";
import PrismjsThemeSupport from "src/common/presentation/components/molecules/PrismjsThemeSupport";
import Axios from "axios";
import {CssBaseline} from "@mui/material";
import createEmotionCache from "../src/createEmotionCache";
import {EmotionCache} from "@emotion/utils";
import {CacheProvider} from "@emotion/react";

ReactGA.initialize("UA-126240406-1");

const publicToken = "5f5da4885cc60c4007a770e20bcb499584306df76f7024786943770d87d10ec647588ed508a328726c03144cecb04e65377865e992cf557c9398f280355f1b5d66816bd18b466c4c973d90a93c5a04b3635a518688b2e49c468eca9c92bf0098dc6851481cd51bc9d60b33c4b7c65e81885b6dd53990b7e0397451b59cd000e6";
Axios.defaults.headers.common["Authorization"] = "Bearer " + publicToken;

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const makeStore = (preloadedState = {} as RootState) => {
  const bindMiddleware = (middlewares: Middleware[]) => {
    if (process.env.NODE_ENV !== "production") {
      const { composeWithDevTools } = require("redux-devtools-extension");
      const { createLogger } = require("redux-logger");
      return composeWithDevTools(
        applyMiddleware(createLogger(), ...middlewares)
      );
    }
    return applyMiddleware(...middlewares);
  };

  const sagaMiddleware = createSagaMiddleware();

  const reduxStore: Store<RootState, AnyAction> = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware])
  );

  (reduxStore as any).sagaTask = sagaMiddleware.run(rootSaga);

  return reduxStore;
};

interface Props extends AppProps {
  store: Store<RootState>;
  emotionCache?: EmotionCache;
}

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

const MyApp: NextComponentType<AppContext, AppInitialProps, Props> = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
  store,
  router,
}) => {
  useInit();
  useEveryUpdate();

  store.dispatch(setPaths({ pathname: router.asPath }));

  const [prefersDarkMode, toggleColorMode] = usePersistentDarkModePreference(
    "@myeongjae.kim/PREFERS_DARK_MODE"
  );

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
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <PrismjsThemeSupport />

        <ReduxStoreProvider store={store}>
          <SnackbarProvider>
            <div style={{ whiteSpace: "pre-wrap" }}>
              <MainLayout>
                <ColorModeChangeButton
                  isDark={prefersDarkMode}
                  toggle={toggleColorMode}
                />
                <Component {...pageProps} />
              </MainLayout>
              <ConfirmContainer />
              <SnackbarContainer />
              <NotificationCenterContainer />
            </div>
          </SnackbarProvider>
        </ReduxStoreProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withRedux(makeStore)(withReduxSaga(MyApp));
