import { HTTP_CODE } from "../util/util";
import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Recursonão encontrado") {
    super(HTTP_CODE.NOT_FOUND, message)
  }
}
