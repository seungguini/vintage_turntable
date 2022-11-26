import express from "express"
import querystring from "querystring"
import cors from "cors"

import { generateRandomString } from "../utils";

const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
const clientId = process.env.SPOTIFY_CLIENT_ID || "";
const redirectURI = "http://localhost:8000/api/spotify/callback";
const frontendURI = "http://localhost:3000/"

const router = express.Router();

// Creates or regenerate session. This is so we can start fresh new when
// going through the authentication process
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

// Deletes session
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

router.get("/login", (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state";

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectURI,
      state: state
  }));
});

router.get('/callback', async (req, res)=> {
  const code : string = req.query.code.toString() || null;
  const state : string = req.query.code.toString() || null;

  // Probably can use redis database to store
  if (state === null) {
    res.redirect('/' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    let url = new URL('https://accounts.spotify.com/api/token');

    // Setting the query params
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
      return res.send(`Error with code response: ${await accessTokenResponse.text()}`)
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
        return res.send("Cannot save token to session");
      }
      
      // Uncomment this when we integrate with the frontend
      // res.redirect(`${frontendURI}?` +
      //   querystring.stringify({
      //     retrieve_token: true
      //   } 
      // ));

      res.redirect(`/statusCheck`);
    })

  }
})

router.get('/token', (req, res) => {
  const accessToken = req.session.spotifyAccessToken;
  const refreshToken = req.session.spotifyRefreshToken;

  if (!accessToken || !refreshToken) {
    res.status(404);
    res.send("Cannot find access/refresh token. ")
  } else {
    res.status(200);
    res.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    })
  }
})

router.options('/refresh_token', cors());
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
    return res.send(`Error with refresh: ${await response.text()}`);
  }

  const body = await response.json();

  const newAccessToken = body && body.access_token;
  const newRefreshToken = body && body.refresh_token;

  res.json({
    access_token: newAccessToken,
    refresh_token: newRefreshToken
  })

});

export default router;