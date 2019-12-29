import { DailyDetailRequestDto } from "src/daily/api/dto";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";

export const createDailyDetatilRequestDtoFixture = (): DailyDetailRequestDto => ({
  year: "1970",
  month: "01",
  day: "01",
  slug: "slug"
})

describe('createDailyDetailRequestDtoFixture', () => {
  it('should return valid fixture', () => {
    expect(doesObjectHasNoUndefinedProperties(createDailyDetatilRequestDtoFixture())).toBeTruthy();
  })
});