import { toSlug } from '@/app/common/domain/model/toSlug';

describe('toSlug', () => {
  it('should return slug', () => {
    expect(
      toSlug({ slug: 'frontend-unit-test-you-must-write', created_at: '2023-04-17T13:01:19.828' }),
    ).toBe('2023/04/17/frontend-unit-test-you-must-write');
  });
});
