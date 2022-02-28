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
  console.log(req.body)

  const spotifyAPI = new SpotifyWebAPI({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  }) // Instantiate new API

  // client-side Auth code for each user
  const code = req.body.code

  // Asynchronously authenticate Spotify user
  spotifyAPI
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accesToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch((err) => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.get("/login", (req, res) => {
  console.log("login get route")
  res.json("hi")
})

app.get("/", (req, res) => {
  console.log("main route")
  res.json("main route")
})

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// export the express app we created to make it available to other modules
module.exports = app
