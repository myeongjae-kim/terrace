import {Daily} from "src/daily/domain/model/Daily";
import {getSeoulDateFrom} from "src/util";
import {doesObjectHasNoUndefinedProperties} from "src/util/test";

export const createDailyFixture = (): Daily => {
  const daily = Daily.from({
    seq: 1,
    title: "title",
    content: "content",
    slug: "slug"
  });
  daily.id = "1";
  daily.createdAt = "1970-01-01T00:00:00.000Z";
  daily.updatedAt = "1970-01-01T00:00:00.000Z";

  return daily;
};

describe("Daily", () => {
  let daily: Daily;

  beforeEach(() => {
    daily = createDailyFixture();
  });

  [
    ["2019", "12", "29"],
    ["2019", "12", "09"],
    ["2020", "01", "01"],
  ].forEach(args => {
    it("is matched with given date", () => {
      // given
      const year = args[0];
      const month = args[1];
      const day = args[2];

      // when
      daily.createdAt = getSeoulDateFrom()
        .year(Number(year))
        .month(Number(month) - 1)
        .date(Number(day)).toISOString();
      expect(getSeoulDateFrom(daily.createdAt).format("YYYY.MM.DD")).toBe(args.join("."));

      // then
      expect(daily.isDateMatched(year, month, day)).toBeTruthy();
    });
  });

  it("should return valid uri", () => {
    const now = new Date().toISOString();
    daily.createdAt = now;

    expect(daily.getUri()).toBe(`/daily/${getSeoulDateFrom(now).format("YYYY/MM/DD")}/slug`);
  });
});

describe("createDailyFixture", () => {
  it("should return valid object", () => {
    const daily = createDailyFixture();

    expect(doesObjectHasNoUndefinedProperties(daily)).toBeTruthy();
  });
});
