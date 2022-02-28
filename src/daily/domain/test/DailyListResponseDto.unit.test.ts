import { doesObjectHasNoUndefinedProperties } from "src/util/test";
import { createDailyFixture } from "./Daily.unit.test";
import {createDailyListResponseDtoFrom} from "../DailyListResponse";

export const createDailyListResponseDtoFixture = () =>
  createDailyListResponseDtoFrom(createDailyFixture());

describe("createDailyListResponseDtoFixture", () => {
  it("creates valid response dto", () => {
    expect(doesObjectHasNoUndefinedProperties(createDailyListResponseDtoFixture())).toBeTruthy();
  });
});

describe("DailyListResponseDto", () => {
  it("is created by converting function.", () => {
    // given
    const daily = createDailyFixture();

    // when
    const result = createDailyListResponseDtoFrom(daily);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
  });
});