import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"
import TrackSearchResult from "./TrackSearchResult"
import Player from "./Player"

const server_url = process.env.REACT_APP_SERVER_URL

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})
const Dashboard = ({ code }) => {
  const [accessToken, setAccessToken] = useState()

  const [playingTrack, setPlayingTrack] = useState() // Store the track RESULT

  const chooseTrack = (result) => {
    setPlayingTrack(result)
  }
  // Update auth states whenever there is a new auth code from the client side
  useEffect(() => {
    console.log("Getting access token and saving to localStorage!")
    console.log(code)

    // Access token not found in local storage - making Post req. to server to get new tokens
    axios
      .post(server_url + "/login", { code })
      .then((res) => {
        console.log("setting values")
        console.log(res)
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        localStorage.setItem("expiresIn", res.data.expiresIn)
        setAccessToken(res.data.accessToken)
        spotifyAPI.setAccessToken(res.data.accessToken)

        // window.history.pushState({}, null, "/")
      })
      .catch((err) => {
        console.log(err)
        window.location = "/" // Redirect to login screen
      })
  }, [code])

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (!search) {
      console.log("No search!")
      setSearchResults([])
      return
    }

    spotifyAPI.searchTracks(search).then((res) => {
      setSearchResults(res.body.tracks.items)
    })
  }, [search, accessToken])

  return (
    <Container className="d-flex flex-column py-2">
      <Player playingTrack={playingTrack} accessToken={accessToken} />

      <Form.Control
        type="search"
        placeholder="Search Songs / Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {searchResults.map((result, idx) => (
        <TrackSearchResult
          key={idx}
          result={result}
          chooseTrack={chooseTrack}
        />
      ))}
    </Container>
  )
}

export default Dashboard
