import React from "react";
import {NextRouter} from "next/router";
import Optional from "optional-js";

interface Options {
  shallow?: boolean;
  scroll?: boolean;
}

/**
 * Create a handler to go to a given url.
 * When ctrl, alt or metaKey is being pushed, routing will not occur and a new window of the destination page will be opened.
 * If routing has succeeded, return true.
 * @param router Next.js Router
 * If it is 'push', a current page is pushed to the history stack.
 * If it is 'replace', a top of the history stack will be replaced with the current page.
 * getInitialProps will not be called when a destination page is same with current page. The default of 'shallow' is false.
 * If 'scroll' property is true, a browser scroll will be set to the top. The default of 'scroll' is true.
 */
export const returnCreateLinkClickHandler = (router: NextRouter) => (href?: string, as?: string, method: "push" | "replace" = "push", options?: Options) =>
  (e: React.MouseEvent<any, MouseEvent>): Promise<boolean> => {
    if (e.nativeEvent.metaKey || e.nativeEvent.shiftKey || e.nativeEvent.ctrlKey) {
      if (as || href) {
        e.preventDefault();
        window.open(as || href, "_blank");
      }
      return Promise.resolve(false);
    }

    e.preventDefault();

    if (!href) {
      return Promise.resolve(false);
    }

    return router[method](href, as, {
      shallow: Optional.ofNullable(options)
        .map(o => o.shallow)
        .orElse(false)
    })
      .then((succeeded) => {
        if (window && succeeded && Optional.ofNullable(options).map(o => o.scroll).orElse(true)) {
          window.scrollTo(0, 0);
        }
        return succeeded;
      });
  };
