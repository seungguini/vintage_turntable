const express = require("express")
const SpotifyWebAPI = require("spotify-web-api-node")
const cors = require("cors")
const bodyParser = require("body-parser")
// Grab Redirect URI, Client ID, Client Secret from local .env file
require("dotenv").config()

port = 3001

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.post("/login", (req, res) => {
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  }) // Instantiate new API

  // client-side Auth code for each user
  const code = req.body.code
  console.log("HI")
  console.log(code)
  // Asynchronously authenticate Spotify user
  spotifyAPI
    .authorizationCodeGrant(code)
    .then((data) => {
      // console.log(data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      // console.log("ERROR LOGIN")
      // console.log(code)
      console.log(err)
      res.sendStatus(400)
    })
})

// Route to refresh authorization token
app.post("/refresh", (req, res) => {
  console.log("REFRESH BACKEND")
  console.log(req.body)
  const refreshToken = req.body.refreshToken
  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: refreshToken,
  }) // Instantiate new API

  spotifyAPI
    .refreshAccessToken()
    .then((data) => {
      // console.log("The access token has been refreshed!")

      // Save access token for future calls
      spotifyAPI.setAccessToken(data.body["access_token"])

      res.json({
        accesToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      console.log("Failed to refresh access token")
      console.log(err)
    })
})

// export the express app we created to make it available to other modules
module.exports = app
