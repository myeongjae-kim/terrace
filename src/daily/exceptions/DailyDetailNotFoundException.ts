import { DailyDetailRequestDto } from "../api";

export class DailyDetailNotFoundException extends Error {
  public constructor(req: DailyDetailRequestDto) {
    super("A daily has not been found by request: " + JSON.stringify(req));
  }
}