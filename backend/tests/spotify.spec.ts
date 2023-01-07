import { doesNotMatch } from "assert";
import { assert } from "chai"
import request from "supertest"
import app from "../src/app"

describe("Test spotify routes /api/spotify", () => {
  it("Test /login route", (done) => {
    request(app)
      .get("/api/spotify/login")
      .expect(302, done)
  });

  it("Test /callback User rejection", (done) => {
    const error = "Gabagool! User rejected spotify authorization"
    
    request(app)
      .get("/api/spotify/callback")
      .query({
        error // Pass only error query params
      })
      .expect(302)
      .end((err, res) => {
        if(err) return done(err)

        let redirectUrl = res.get("location")
        if ( !redirectUrl.includes("http") ) {
          redirectUrl = "http://example.com" + redirectUrl;
        }
        const url = new URL(redirectUrl)

        assert.equal(url.searchParams.get("error"), error)
        return done()
      })
  })

  it("Test /callback fail fetch token", (done) => {
    const state = "New York State Of Mind"
    const code = "Bocchi The Rock"

    request(app)
      .get("/api/spotify/callback")
      .query({
        state,
        code
      })
      .expect(302)
      .end((err, res) => {
        if(err) return done(err)

        let redirectUrl = res.get("location")
        if ( !redirectUrl.includes("http") ) {
          redirectUrl = "http://example.com" + redirectUrl;
        }
        const url = new URL(redirectUrl)

        // What we expect from spotify
        const error = url.searchParams.get("error")
        const errorDescription = url.searchParams.get("error_description")

        assert.exists(error, "error query param should exist")
        assert.exists(errorDescription, "error_description query param should exist")

        return done()
      })
  })

  it("Test /token no token found.", (done) => {
    // Test will fail because we don't have accessToken
    // and refreshToken with associated session

    request(app)
      .get("/api/spotify/token")
      .expect(404)
      .end((err, res) => {
        if(err) return done(err)
        
        assert.exists(res.body.error)
        assert.equal(res.body.error, "Cannot find access/refresh token.")

        done()
      })
  })

  it("Test /refresh_token fail, invalid refresh token", (done) => {
    const invalidRefreshToken = ""
    
    request(app)
      .post("/api/spotify/refresh_token")
      .send({
        refresh_token: invalidRefreshToken
      })
      .expect(500)
      .end((err, res) => {
        if (err) return done(err)
        
        assert.exists(res.body.error)
        assert.exists(res.body.error_description)
        done()
      })
  })
})