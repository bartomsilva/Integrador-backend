import { HTTP_CODE } from "../util/util";
import { BaseError } from "./BaseError";

export class ConflictError extends BaseError {
  constructor(message: string = "Recurso já cadastrado") {
    super(HTTP_CODE.CONFLICT, message)
  }
}
