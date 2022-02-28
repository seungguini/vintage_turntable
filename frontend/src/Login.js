import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import env from "react-dotenv"
require("dotenv").config()

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-playback-state%20user-modify-playback-state%20user-read-private%20user-library-modify%20user-library-read%20streaming%20user-read-playback-position%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20user-top-read%20playlist-modify-public%20user-read-currently-playing%user-read-recently-played`

const Login = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="success">Login to Spotify</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
