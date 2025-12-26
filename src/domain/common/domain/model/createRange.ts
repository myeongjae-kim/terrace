export const createRange = (
  start: number,
  end: number,
  result: Array<number> = [],
): Array<number> => {
  if (start > end) {
    return result;
  }

  return createRange(start + 1, end, [...result, start]);
};
