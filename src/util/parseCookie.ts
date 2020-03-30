import Optional from "optional-js";

const cookieRegExp = /(.+)=(.+)/;

export const parseCookie = (cookie?: string): Map<string, string> => {
  return Optional.ofNullable(cookie)
    .map(c => c.split(";"))
    .map(c => c.map(cookieToTrim => cookieToTrim.trim()))
    .map(c => c.map(cookieToBeExecuted => cookieRegExp.exec(cookieToBeExecuted)))
    .map(c => {
      const map = new Map<string, string>();
      c.forEach(ary => {
        if (!ary) {
          return;
        }
        map.set(ary[1], ary[2]);
      });
      return map;
    })
    .orElse(new Map<string, string>());
};