import {PostBusiness} from "../../../src/business/PostBusiness"
import {PostDataBaseMock} from "../../mocks/PostDataBase.Mock"
import { IdGeneratorMock } from "../../mocks/IdGenerator.Mock"
import { TokenManagerMock } from "../../mocks/TokenManager.Mock"


describe("Testando createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDataBaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

})