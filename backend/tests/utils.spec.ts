import { generateRandomString } from "../src/utils";
import { assert } from "chai"

describe("Test Utils", () => {
  it("Test generate random string digits", () => {
    const randomStr = generateRandomString(10);

    assert.equal(randomStr.length, 10);
  })
})