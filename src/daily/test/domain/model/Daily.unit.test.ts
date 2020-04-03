import { Daily } from "src/daily/domain/model/Daily";
import { getSeoulDateFrom } from "src/util";
import { doesObjectHasNoUndefinedProperties, doesObjectHasNoUndefinedPropertiesExcept } from "src/util/test";

export const createDailyFixture = (): Daily => {
  const daily = Daily.from({
    seq: 1,
    title: "title",
    content: "content",
    slug: "slug"
  });
  daily.id = "1";
  daily.createdAt = new Date();
  daily.updatedAt = new Date();

  return daily;
};

describe("Daily", () => {
  let daily: Daily;

  beforeEach(() => {
    daily = createDailyFixture();
  });

  it("is created by static factory method.", () => {
    // given
    const result = Daily.from({
      seq: 1,
      title: "title",
      content: "content",
      slug: "slug"
    });

    // expect
    expect(doesObjectHasNoUndefinedPropertiesExcept(result, "id")).toBeTruthy();
    expect(result.seq).toBe(1);
    expect(result.title).toBe("title");
    expect(result.content).toBe("content");
    expect(result.slug).toBe("slug");
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
        .date(Number(day)).toDate();
      expect(getSeoulDateFrom(daily.createdAt).format("YYYY.MM.DD")).toBe(args.join("."));

      // then
      expect(daily.isDateMatched(year, month, day)).toBeTruthy();
    });
  });

  it("should return valid uri", () => {
    const now = new Date();
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