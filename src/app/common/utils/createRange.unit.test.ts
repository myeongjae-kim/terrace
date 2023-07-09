import { createRange } from '@/app/common/utils/createRange';

describe('createRange', () => {
  const testCases = [
    [1, 3, [1, 2, 3]],
    [1, 1, [1]],
    [2, 1, []],
    [0, 0, [0]],
    [-10, -7, [-10, -9, -8, -7]],
  ] as const;

  testCases.forEach(([start, end, expected]) => {
    it(`should return ${expected} when start is ${start} and end is ${end}`, () => {
      expect(createRange(start, end)).toEqual(expected);
    });
  });
});
