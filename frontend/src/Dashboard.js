import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import { Container, Form } from "react-bootstrap"
import SpotifyWebApi from "spotify-web-api-node"
import axios from "axios"

const server_url = process.env.REACT_APP_SERVER_URL

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})
const Dashboard = ({ code }) => {
  let accessToken = ""
  let refreshToken = ""
  let expiresIn = 0

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
      {code}
      <Form.Control
        type="search"
        placeholder="Search Songs / Artists"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {searchResults.map((result, idx) => {
        return <p key={idx}>{result.name}</p>
      })}
    </Container>
  )
}

export default Dashboard
