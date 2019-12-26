import { Daily } from "src/daily/domain/model/Daily"
import { doesObjectHasNoUndefinedProperties, doesObjectHasNoUndefinedPropertiesExcept } from "src/util/test"

export const createDailyFixture = (): Daily => {
  const daily = Daily.from({
    seq: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    title: 'title',
    content: 'content',
    slug: "slug"
  })
  daily.id = "1";

  return daily;
}

describe('Daily', () => {
  it('is created by static factory method.', () => {
    // given
    const daily = Daily.from({
      seq: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: 'title',
      content: 'content',
      slug: 'slug'
    })

    // expect
    expect(doesObjectHasNoUndefinedPropertiesExcept(daily, "id")).toBeTruthy();
    expect(daily.seq).toBe(1);
    expect(daily.title).toBe("title");
    expect(daily.content).toBe("content");
    expect(daily.slug).toBe("slug");
  })
})

describe("createDailyFixture", () => {
  it('should return valid object', () => {
    const daily = createDailyFixture();

    expect(doesObjectHasNoUndefinedProperties(daily)).toBeTruthy();
  })
})