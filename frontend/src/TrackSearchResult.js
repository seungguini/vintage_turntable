import React from "react"

export default function TrackSearchResult({ result, chooseTrack }) {
  console.log(result)

  const handlePlay = () => {
    chooseTrack(result)
  }
  return (
    <div
      className="d-flex m-2 align-items-center"
      style={{ cursor: "pointer" }}
    >
      <img
        src={result.album.images[0].url}
        style={{ height: "64px", width: "64px" }}
        onClick={() => handlePlay()}
      ></img>
      <div className="ml-3">
        <div>{result.name}</div>
        <div className="text-muted">{result.artists[0].name}</div>
      </div>
    </div>
  )
}
