import { require } from '@/app/common/utils/require';

describe('require', () => {
  const maybeString = (x: string | undefined): string => {
    require(x !== undefined);

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
