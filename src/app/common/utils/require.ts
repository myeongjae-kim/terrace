// https://twitter.com/mattpocockuk/status/1677306202466689027
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function require(condition: any): asserts condition {
  if (!condition) {
    throw new Error('IllegalArgumentError');
  }
}
