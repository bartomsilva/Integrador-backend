import {PostBusiness} from "../../../src/business/PostBusiness"
import {PostDataBaseMock} from "../../mocks/PostDataBaseMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"


describe("Testando createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )



})