import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import createSagaMiddleware from "@redux-saga/core";
import withReduxSaga from 'next-redux-saga';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider as ReduxStoreProvider } from "react-redux";
import { AnyAction, applyMiddleware, createStore, Middleware, Store } from 'redux';
import I18NService from 'src/common/domain/service/I18NService';
import { MainLayout } from 'src/common/presentation/components/templates';
import theme from 'src/common/presentation/components/theme';
import ConfirmContainer from 'src/common/presentation/container/molecules/ConfirmContainer';
import SnackbarContainer from 'src/common/presentation/container/molecules/SnackbarContainer';
import NotificationCenterContainer from 'src/common/presentation/container/organisms/NotificationCenterContainer';
import { setPaths } from 'src/common/presentation/state-module/common';
import { rootReducer, rootSaga, RootState } from 'src/common/presentation/state-module/root';

const { appWithTranslation } = I18NService;

const makeStore = (preloadedState = {} as RootState) => {
  const bindMiddleware = (middlewares: Middleware[]) => {
    if (process.env.NODE_ENV !== 'production') {
      const { composeWithDevTools } = require('redux-devtools-extension')
      const { createLogger } = require('redux-logger');
      return composeWithDevTools(applyMiddleware(createLogger(), ...middlewares))
    }
    return applyMiddleware(...middlewares)
  }

  const sagaMiddleware = createSagaMiddleware();

  const reduxStore: Store<RootState, AnyAction> = createStore(
    rootReducer,
    preloadedState,
    bindMiddleware([sagaMiddleware])
  );

  (reduxStore as any).sagaTask = sagaMiddleware.run(rootSaga);

  return reduxStore
};

interface AppProps {
  store: Store<RootState>
}

class MyApp extends App<AppProps> {
  public componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  public render() {
    const { Component, pageProps, store, router } = this.props;
    store.dispatch(setPaths({ pathname: router.asPath }))

    return <>
      <Head>
        <title>:: Myeongjae Kim</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <ReduxStoreProvider store={store}>
          <SnackbarProvider style={{ whiteSpace: 'pre-wrap' }}>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
            <ConfirmContainer />
            <SnackbarContainer />
            <NotificationCenterContainer />
          </SnackbarProvider>
        </ReduxStoreProvider>
      </ThemeProvider>
    </>
  }
}

export default withRedux(makeStore)(withReduxSaga(appWithTranslation(MyApp)))