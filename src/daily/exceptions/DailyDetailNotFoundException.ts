import { DailyDetailPathDto } from "../api";

export class DailyDetailNotFoundException extends Error {
  public constructor(req: DailyDetailPathDto) {
    super("A daily has not been found by request: " + JSON.stringify(req));
  }
}