import { HTTP_CODE } from "../util/util";
import { BaseError } from "./BaseError";

export class UnAuthorizedError extends BaseError {
  constructor(message: string = "Autorização negada") {
    super(HTTP_CODE.UNAUTHORIZED, message)
  }
}
