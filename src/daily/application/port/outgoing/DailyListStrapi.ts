import {DailyAttributes} from "./DailyAttributes";

export interface DailyListStrapi {
  id: number;
  attributes: Omit<DailyAttributes, "content">
}
