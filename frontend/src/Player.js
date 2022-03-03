import React, { useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export default function Player({ playingTrack, accessToken }) {
  useEffect(() => {
    console.log("found accessToken - attempting to render player!")
  }, [accessToken])

  if (!accessToken) {
    console.log("No acessToken")
    return null
  }

  if (!playingTrack) {
    console.log("No playing track")
    return null
  }
  console.log(accessToken)
  let trackURI = playingTrack.uri
  console.log(trackURI)
  console.log("attempting to display player!")
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      autoPlay
      magnifySliderOnHover
      uris={trackURI ? [trackURI] : []}
    />
  )
}
