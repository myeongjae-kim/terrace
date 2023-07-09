// https://twitter.com/mattpocockuk/status/1676162572095979522
export const raise = (err: string): never => {
  throw new Error(err);
};
