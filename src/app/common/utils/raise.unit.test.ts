import { raise } from '@/app/common/utils/raise';

describe('raise', () => {
  it('assert optional string to string', () => {
    const optionalString: string | undefined = undefined;
    try {
      const _str = optionalString ?? raise('undefined');
    } catch (err) {
      expect((err as Error).message).toBe('undefined');
    }
  });
});
