/**
 * stringify receives any variable and return a string
 */
export default (a?: any): string => {
  if (!a) {
    return typeof a;
  }

  if (a.toString && a.toString instanceof Function) {
    return a.toString();
  }

  return JSON.stringify(a);
}