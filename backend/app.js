const express = require("express")
const SpotifyWebAPI = require("spotify-web-api-node")

// Grab Redirect URI, Client ID, Client Secret from local .env file
require("dotenv").config()

const app = express()

const spotifyAPI = new SpotifyWebAPI({
  redirectURI: process.env.REDIRECT_URI,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
}) // Instantiate new API

const authSpotify = async (code) => {
  try {
    return await spotifyAPI.authorizationCodeGrant(code)
  } catch {
    return 0
  }
}

app.post("/login", (req, res) => {
  // client-side Auth code for each user
  const code = req.body.code

  // Asynchronously authenticate Spotify user
  const data = authSpotify(code)

  if (data == 0) {
    res.sendStatus(400)
  } else {
    res.json({
      accesToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app
