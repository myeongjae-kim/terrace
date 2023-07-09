import { formatDate } from '@/app/common/domain/model/formatDate';

describe('formatDate', () => {
  it('should return formatted date string', () => {
    expect(formatDate('2023-04-17T13:01:19.828')).toBe('2023 / 04 / 17');
  });
});
