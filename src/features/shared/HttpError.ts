import { HttpStatusCode } from "axios";

export default class HttpError extends Error {
  public constructor(
    public message: string,
    public statusCode: HttpStatusCode
  ) {
    super(message);
  }
}
