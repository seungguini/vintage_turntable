/**
 * Custom React Hook to handle Spotify authentication
 */

import React, { useEffect, useState } from "react"
import axios from "axios"

// Should EXCLUDE trailing slash ( / )
const server_url = process.env.REACT_APP_SERVER_URL

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  console.log("runnig useAuth")

  // Update auth states whenever there is a new auth code from the client side (i.e. new update)
  useEffect(() => {
    console.log("useEffect in useAuth ran!")
    console.log(server_url + "/login")
    axios
      .post(server_url + "/login", { code })
      .then((res) => {
        console.log("received response")
        console.log(res.data)
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [code])

  return accessToken
}
