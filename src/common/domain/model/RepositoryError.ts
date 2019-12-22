import { AxiosError } from 'axios';
import Optional from 'optional-js'
import { ApiError } from 'server/common/error/ApiError';

export interface RepositoryErrorData extends AxiosError<ApiError> { }

export default class RepositoryError {

  public get timestamp() {
    return this._timestamp;
  }

  public get status() {
    return this._status;
  }

  public get error() {
    return this._error;
  }

  public get message() {
    return this._message;
  }

  public static of(e?: RepositoryErrorData) {
    return new RepositoryError(e);
  }

  private _timestamp: string = new Date().toISOString();
  private _status: number = -1;
  private _error: string = "Unknown error.";
  private _message: string = "Unknown message.";

  private constructor(e?: RepositoryErrorData) {
    if (!e) {
      return;
    }

    if (!e.isAxiosError || !e.response || !e.response.data) {
      this._message = e.message
      return;
    }

    const errorData = Optional.of(e.response.data);

    this._timestamp = errorData.map(({ timestamp }) => timestamp).orElse(this.timestamp);
    this._status = errorData.map(({ status }) => status).orElse(this.status);
    this._error = errorData.map(({ error }) => error).orElse(this.error);
    this._message = errorData.map(({ message }) => message).orElse(this.message);
  }

  public toString = () => `Error: ${this.error}
Status: ${this.status}
Message: ${this.message}
Timestamp: ${this.timestamp}`
}