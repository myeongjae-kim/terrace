import { DailyDetailRequestDto } from "src/daily/api/dto";

export const createDailyDetatilRequestDto = (): DailyDetailRequestDto => ({
  year: "1970",
  month: "01",
  day: "01",
  slug: "slug"
})