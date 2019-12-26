import { createDailyListResponseDtoFrom } from "src/daily/api";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";
import { createDailyFixture } from "../../domain/model/Daily.unit.test"

export const createDailyListResponseDtoFixture = () =>
  createDailyListResponseDtoFrom(createDailyFixture());

describe('createDailyListResponseDtoFixture', () => {
  it('creates valid response dto', () => {
    expect(doesObjectHasNoUndefinedProperties(createDailyListResponseDtoFixture())).toBeTruthy();
  })
})

describe('DailyListResponseDto', () => {
  it('is created by converting function.', () => {
    // given
    const daily = createDailyFixture();

    // when
    const result = createDailyListResponseDtoFrom(daily);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  })
})