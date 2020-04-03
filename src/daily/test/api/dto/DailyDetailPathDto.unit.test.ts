import { DailyDetailPathDto } from "src/daily/api/dto";
import { doesObjectHasNoUndefinedProperties } from "src/util/test";

export const createDailyDetatilPathDtoFixture = (): DailyDetailPathDto => ({
  year: "1970",
  month: "01",
  day: "01",
  slug: "slug"
});

describe("createDailyDetailRequestDtoFixture", () => {
  it("should return valid fixture", () => {
    expect(doesObjectHasNoUndefinedProperties(createDailyDetatilPathDtoFixture())).toBeTruthy();
  });
});