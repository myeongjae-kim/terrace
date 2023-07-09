import { myRequire } from '@/app/common/utils/myRequire';

describe('require', () => {
  const maybeString = (x: string | undefined): string => {
    myRequire(x !== undefined);

    return x;
  };

  it('should throw error', () => {
    try {
      maybeString(undefined);
    } catch (e) {
      expect((e as Error).message).toBe('IllegalArgumentError');
    }
  });

  it('should not throw error', () => {
    expect(maybeString('string')).toBe('string');
  });
});
