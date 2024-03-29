import express from "express"
import querystring from "querystring"
import cors from "cors"

import { generateRandomString, getBackendURL, getFrontendURL } from "../utils";

const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
const clientId = process.env.SPOTIFY_CLIENT_ID || "";

// Make sure it is registered on spotify
// Right now only http://localhost:8000 is registered
const redirectURI = `${getBackendURL()}/api/spotify/callback`;

// Scopes: https://developer.spotify.com/documentation/general/guides/authorization/scopes/
const scope = `
  user-read-private
  user-read-email
  streaming
  user-read-playback-state
  user-modify-playback-state
  app-remote-control`;

const router = express.Router();

/**
 * GET
 * Description: Creates or regenerate session. This is so we can start fresh new when
 * going through the authentication process.
 * 
 * Query Params: None
 * Body: None
 * 
 * Returns: None. It will store the cookie in your browser
 * 
 * Example.
 * 
 * GET http://localhost:8000/api/spotify/session
 */
router.get("/session", (req, res) => {
  req.session.regenerate((err) => {
    if(err) {
      console.log(`Cannot regenerate session`)
      console.log(err)
  
      res.status(500);
      res.send(`Cannot regenerate session ${err}`)
    } else {
      res.status(200);
      res.send(req.session.id)
    }

  });

})

/**
 * DELETE
 * Description: Deletes session.
 * 
 * Query Params: None
 * Body: None
 * 
 * Returns: None
 * 
 * Example.
 * 
 * Delete http://localhost:8000/api/spotify/session
 */
router.delete("/session", (req, res) => {
  const sessionId = req.session.id;

  req.session.destroy((err) => {
    if(err) {
      console.log(`Cannot regenerate session`)
      console.log(err)

      res.status(500);
      res.send(`Cannot delete session ${err}`)
    } else {
      res.status(200);
      res.send(`Deleted Session ${sessionId}`);
    }
  })

})

/**
 * GET
 * Description: Kickstarts the process to login to your spotify account
 * 
 * Query Params: None
 * Body: None
 * 
 * Returns: None
 * 
 * Example.
 * GET http://localhost:8000/api/spotify/login
 */
router.get("/login", (req, res) => {
  const state = generateRandomString(16);

  const redirectUrl = 'https://accounts.spotify.com/authorize?' +
  querystring.stringify({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectURI,
    state: state
  })

  res.send(redirectUrl);
});

/**
 * GET
 * Description: What spotify authorization workflow will call when you log into your account.
 * This should never be called by anyone else other than the spotify service. Here we recieve
 * the access_token and refresh_token and store it in the session-store.
 * 
 * Query Params:
 *  If user allows us to access their spotify account
 *  - Code: String - An authorization code that can be exchanged for an Access Token. 
 *  - State: String - The value of the state parameter supplied in the request.
 * 
 *  If user rejects us to access their spotify account
 *  - Error: String - The reason authorization failed, for example: “access_denied”
 *  - State: String - The value of the state parameter supplied in the request.
 * 
 *  Return: Redirect to webapp.
 * 
 *  Example.
 *  GET http://localhost:8000/api/spotify/callback
 */
router.get('/callback', async (req, res)=> {
  const code : string = req.query.code && req.query.code.toString() || null;
  // Will use state later to verify request
  const state : string = req.query.state && req.query.state.toString() || null;
  const error : string = req.query.error && req.query.error.toString() || null;

  const frontendURL = getFrontendURL();

  // User rejects our authorization to use spotify
  if (error) {
    res.redirect(`${frontendURL}?` +
    querystring.stringify({
      error
    }));
  }

  const spotifyTokenURL = "https://accounts.spotify.com/api/token";
  let url = new URL(spotifyTokenURL);

  // Setting the query params
  // Documentation here: 
  // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
  url.searchParams.set("code", code);
  url.searchParams.set("redirect_uri", redirectURI);
  url.searchParams.set("grant_type", "authorization_code")

  const options = {
    method: "POST",
    headers: {
      "Authorization": "Basic " + Buffer.from((clientId + ':' + clientSecret)).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const accessTokenResponse = await fetch(url, options);

  if (!accessTokenResponse.ok) {

    const textError = await accessTokenResponse.text()
    const jsonError = JSON.parse(textError)

    res.redirect(`${frontendURL}?` + 
      querystring.stringify(jsonError));
  }

  const body = await accessTokenResponse.json();

  const accessToken = body && body.access_token;
  const refreshToken = body && body.refresh_token;

  req.session.spotifyAccessToken = accessToken;
  req.session.spotifyRefreshToken = refreshToken;

  req.session.save((err) => {
    if(err) {
      console.log("Failed to save the data to sesssion");
      console.log(err)

      res.status(500);
      return res.send(`Cannot save token to session: ${err.toString()}`);
    }

    res.redirect(`${frontendURL}?` +
      querystring.stringify({
        retrieve_token: true
      } 
    ));
  })

})

/**
 * GET
 * Description: Fetch the spotify access_token and refresh_token. The session from cookies in the browser
 * should retrieve the right credentials.
 * 
 * Query Params: None
 * Body: None
 * 
 * 
 * Return - 200 Success : {
 *  accessToken: String
 *  refreshToken: String
 * }
 * 
 * Return - 404 Not Found : "Access Token Cannot Be Found"
 * 
 * Example.
 * GET http://localhost:8000/api/spotify/token
 */
router.get('/token', (req, res) => {
  const accessToken = req.session.spotifyAccessToken;
  const refreshToken = req.session.spotifyRefreshToken;

  if (!accessToken || !refreshToken) {
    res.status(404);
    res.json({
      error: "Cannot find access/refresh token."
    })
  } else {
    res.status(200);
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
})

/**
 * POST
 * Description: Refresh access_token and refresh_token.
 * 
 * Query Params: None
 * Body: {
 *  refresh_token: String
 * }
 * 
 * 
 * Return - 200 Success : {
 *  access_token: String
 *  refresh_token: String
 * }
 *
 * 
 * Example.
 * POST http://localhost:8000/api/spotify/refresh_token
 * Body: {
 *  refresh_token: "this_is_a_random_refresh_token_here"
 * }
 */
router.post('/refresh_token', async (req, res) => {
  // requesting access token from refresh token

  const refreshToken = req.body?.refresh_token;

  let url : URL = new URL("https://accounts.spotify.com/api/token");
  url.searchParams.set("grant_type", "refresh_token");
  url.searchParams.set("refresh_token", refreshToken);

  const options = {
    method: "POST",
    headers: { 
      'Authorization': 'Basic ' + Buffer.from((clientId + ':' + clientSecret)).toString("base64"),
      'Content-Type': "application/x-www-form-urlencoded"
    }
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    res.status(500)
    const body = await response.json()
    return res.json({
      error: body.error,
      error_description: body.error_description
    });
  }

  const body = await response.json();

  const newAccessToken = body && body.access_token;
  const newRefreshToken = 
    body && 
    body.refresh_token || 
    refreshToken; // If refresh token is not available use old refresh token

  res.json({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  })

});

export default router;