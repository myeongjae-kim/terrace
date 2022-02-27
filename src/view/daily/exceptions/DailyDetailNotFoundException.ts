import { DailyPathDto } from "../api";

export class DailyDetailNotFoundException extends Error {
  public constructor(req: DailyPathDto) {
    super("A daily has not been found by request: " + JSON.stringify(req));
  }
}