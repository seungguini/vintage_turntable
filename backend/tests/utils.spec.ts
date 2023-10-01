import { generateRandomString, getBackendURL, getEnvironment, getFrontendURL } from "../src/utils";
import { assert } from "chai"
import { Environment } from "../src/constants";

describe("Test Utils", () => {
  it("Test generate random string digits", () => {
    const randomStr = generateRandomString(10);

    assert.equal(randomStr.length, 10);
  });

  describe("Test getEnvironment: ", () => {
    it("dev", () => {
      process.env.NODE_ENV = "dev";

      const env : Environment = getEnvironment();
      assert.equal(env, Environment.DEV);
    });

    it("staging", () => {
      process.env.NODE_ENV = "staging";

      const env = getEnvironment();
      assert.equal(env, Environment.STAGING);
    });

    it("prod", () => {
      process.env.NODE_ENV = "prod";

      const env = getEnvironment();
      assert.equal(env, Environment.PROD);
    });

    it("no NODE_ENV", () => {
      delete process.env.NODE_ENV;

      const env = getEnvironment();
      assert.equal(env, Environment.DEV);
    });

    it("random NODE_ENV", () => {
      process.env.NODE_ENV = "dungeon of black company";

      const env = getEnvironment();
      assert.equal(env, Environment.DEV);
    });
  });

  describe("Test getFrontendURL: ", () => {

    it("Dev", () => {
      const expectedUrl = "http://dev-frontend.com";
      process.env.NODE_ENV = "dev";
      process.env.FRONTEND_DEV_URL = expectedUrl;

      const url = getFrontendURL();
      assert.equal(expectedUrl, url);
    });

    it("Staging", () => {
      const expectedUrl = "http://staging-frontend.com";
      process.env.NODE_ENV = "staging";
      process.env.FRONTEND_STAGING_URL = expectedUrl;

      const url = getFrontendURL();
      assert.equal(expectedUrl, url);
    });

    it("Prod", () => {
      const expectedUrl = "http://prod-frontend.com";
      process.env.NODE_ENV = "prod";
      process.env.FRONTEND_PROD_URL = expectedUrl;

      const url = getFrontendURL();
      assert.equal(expectedUrl, url);
    });
  });

  describe("Test getBackendURL: ", () => {
    it("Dev", () => {
      const expectedUrl = "http://dev-backend.com";
      process.env.NODE_ENV = "dev";
      process.env.BACKEND_DEV_URL = expectedUrl;

      const url = getBackendURL();
      assert.equal(expectedUrl, url);
    });

    it("Staging", () => {
      const expectedUrl = "http://staging-backend.com";
      process.env.NODE_ENV = "staging";
      process.env.BACKEND_STAGING_URL = expectedUrl;

      const url = getBackendURL();
      assert.equal(expectedUrl, url);
    });

    it("Prod", () => {
      const expectedUrl = "http://prod-backend.com";
      process.env.NODE_ENV = "prod";
      process.env.BACKEND_PROD_URL = expectedUrl;

      const url = getBackendURL();
      assert.equal(expectedUrl, url);
    });
  })
})
