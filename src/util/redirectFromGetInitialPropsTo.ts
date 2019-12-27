import { ServerResponse } from "http";
import Router from "next/router";

export const redirectFromGetInitialPropsTo = (location: string, res?: ServerResponse): void => {
  if (res) {
    res.writeHead(302, {
      Location: location
    })
    res.end()
  } else {
    Router.push(location)
  }
}