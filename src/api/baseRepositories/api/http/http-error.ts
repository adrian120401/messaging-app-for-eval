import { BaseError } from "../../../errors/BaseError";
import HttpResponse from "../../../http/HttpResponse";
import { HttpStatusCode } from "./constants";

export function throwHttpError(errorResponse: HttpResponse): never {
  const data = errorResponse.body;

  if (!data) {
    throw new BaseError("Request cancelled", HttpStatusCode.CANCELED_ERROR);
  }

  const message = data.description ?? data.message ?? "Unknown Error";
  const status = errorResponse.status ?? HttpStatusCode.GENERIC;
  const response = data.details;
  const { code } = data;

  throw new BaseError(message, status, code, response);
}
