import { assert } from "chai"
import request from "supertest"
import app from "../src/app"

describe("Generic routes tests", () => {
  it("/statusCheck", (done) => {
    request(app)
      .get("/statusCheck")
      .expect(200)
      .end((err,res) => {
        if(err) return done(err)

        assert.equal(res.text, "OK")
        return done();
      })
  });
})