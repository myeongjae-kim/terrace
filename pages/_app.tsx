/* eslint-disable @typescript-eslint/no-var-requires */

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import createSagaMiddleware from "@redux-saga/core";
import withReduxSaga from "next-redux-saga";
import withRedux from "next-redux-wrapper";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactGA from "react-ga";
import { Provider as ReduxStoreProvider } from "react-redux";
import {
  AnyAction,
  applyMiddleware,
  createStore,
  Middleware,
  Store,
} from "redux";
import { DOMAIN } from "src/common/constants/Constants";
import { appWithTranslation } from "next-i18next";
import { MainLayout } from "src/common/presentation/components/templates";
import themeCreator from "src/common/presentation/components/themeCreator";
import ConfirmContainer from "src/common/presentation/container/molecules/ConfirmContainer";
import SnackbarContainer from "src/common/presentation/container/molecules/SnackbarContainer";
import NotificationCenterContainer from "src/common/presentation/container/organisms/NotificationCenterContainer";
import { setPaths } from "src/common/presentation/state-module/common";
import {
  rootReducer,
  rootSaga,
  RootState,
} from "src/common/presentation/state-module/root";
import { isServer } from "src/util";
import { NextComponentType } from "next";
import { AppContext, AppInitialProps, AppProps } from "next/app";
import App from "next/app";
import ColorModeChangeButton from "src/common/presentation/components/molecules/ColorModeChangeButton";
import { usePersistentDarkModePreference } from "src/common/domain/model/usePersistentDarkModePreferences";
import PrismjsThemeSupport from "src/common/presentation/components/molecules/PrismjsThemeSupport";
import Axios from "axios";

ReactGA.initialize("UA-126240406-1");

// const publicToken = "df80bef2f1ad95d594de95adba4302dad3aec91341c53ea197fc44858ccc412341af11ce5c601ef8c698524625b5a6a8df45866ee4c36ffc4c17012b4db36cbf55d49b0f0b26a3cf07f602549b654562822679579d33d796f28f86dd6c2401f2919b90efe0046e026fa475b1955939ca92ede6c2e93a7f3031282be648cf9904";
const publicToken = "7c0c551d5d1dfb5be967280eb1ff59175c851ad8a77dec1e8b837b43dadddab65e1e692d27c13d040f9f88e13ff7f9caee78c7fc4f2be847ea2739b379008dd19f516a548827824dfe5483a57e34b4160cb845cdebf16ce3063ce5f560773e89e3c43db40fbb2a4db34df02ac33b7823961a7bb677742e67d191a90922ba2a0d";
Axios.defaults.headers.common["Authorization"] = "Bearer " + publicToken;

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

  const theme = React.useMemo(() => themeCreator(prefersDarkMode), [
    prefersDarkMode,
  ]);

  return (
    <>
      <Head>
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

        <ReduxStoreProvider store={store}>
          <SnackbarProvider style={{ whiteSpace: "pre-wrap" }}>
            <>
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
            </>
          </SnackbarProvider>
        </ReduxStoreProvider>
      </ThemeProvider>
    </>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default withRedux(makeStore)(withReduxSaga(appWithTranslation(MyApp)));
