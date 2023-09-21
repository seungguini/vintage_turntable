import app from "./app"
import { getBackendURL, getEnvironment, getFrontendURL } from "./utils";

/**
 * This snippet of code could be in the end of app.ts but it will 
 * cause the unit tests to hang. By importing app with listen will cause 
 * the unit tests to hang.
 * 
 * Although in jest, I think it can still apply to mocha
 * Source: https://github.com/facebook/jest/issues/5783
 * Article written about this case: https://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/
 */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  const env = getEnvironment();
  const frontendUrl = getFrontendURL();
  const backendUrl = getBackendURL();
  console.log(`Starting Server On: ${env}`);
  console.log(`Using ${frontendUrl} as frontend url`);
  console.log(`Using ${backendUrl} as backend url`);
  console.log(`Listening on port ${port}`);
})