import Router from "next/router";
import NProgress from "nprogress";
import React from "react";

NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  trickleSpeed: 100,
});

export const useNProgressLoader = () => {
  const start = React.useCallback(() => {
    NProgress.start();
  }, []);

  const end = React.useCallback(() => {
    NProgress.done();
  }, []);

  React.useEffect(() => {

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, [start, end]);
};
