import moment from "moment-timezone";
import { AjaxError } from "rxjs/ajax";

export class ApiError {
  public timestamp: string;

  public constructor(
    public status: number,
    public error: string,
    public message: string,
  ) {
    this.timestamp = moment().tz("Asia/Seoul").toISOString(true);
    // eslint-disable-next-line no-console
    console.log("error", JSON.stringify(this));
  }

  public static from(ajaxError: AjaxError) {
    const response = ajaxError.response as Partial<ApiError> || {};

    return new ApiError(
      response.status || ajaxError.xhr.status,
      response.error || ajaxError.xhr.statusText,
      response.message || JSON.stringify(ajaxError.xhr.response)
    );
  }
}