/**
 * Custom React Hook to handle Spotify authentication
 */

import { useEffect, useState } from "react"
import axios from "axios"

// Should EXCLUDE trailing slash ( / )
const server_url = process.env.REACT_APP_SERVER_URL

export default function useAuth(code) {
  console.log("runnig useAuth")

  // Recursive function to refresh tokens 1 minute before it expires
  const refreshToken = () => {}

  // Update auth states whenever there is a new auth code from the client side (i.e. new update)
  useEffect(() => {
    console.log("useEffect in useAuth ran!")
    console.log(code)
    axios
      .post(server_url + "/login", { code })
      .then((res) => {
        console.log("setting values")
        console.log(res)
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("refreshToken", res.data.refreshToken)
        localStorage.setItem("expiresIn", res.data.expiresIn)

        refreshToken()
        // window.history.pushState({}, null, "/")
      })
      .catch((err) => {
        console.log(err)
        // window.location = "/"
      })
  }, [code])

  // useEffect(() => {
  //   if (refreshToken || !expiresIn) return // If refreshToken hasn't been loaded into state yet
  //   const interval = setInterval(() => {
  //     console.log("MAKING REFRESH POST REQ")
  //     axios
  //       .post(server_url + "/refresh", { refreshToken })
  //       .then((res) => {
  //         setAccessToken(res.data.accessToken)
  //         setExpiresIn(res.data.expiresIn)
  //       })
  //       .catch((err) => {
  //         console.log("refresh ERROR")
  //         window.location = "/"
  //       })
  //     // expiresIn is a set value -> we make the refresh call a minute before the token exires
  //     // }, (expiresIn - 60) * 1000) // Count down til a minute before the token expires
  //   }, (expiresIn - 60) * 1000)

  //   // If the refresh token accidentally resets, clear timeout
  //   return () => clearInterval(interval)
  // }, [refreshToken, expiresIn])
}
