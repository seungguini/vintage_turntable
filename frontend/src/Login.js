import React from "react"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=user-read-playback-state%20user-modify-playback-state%20user-read-email%20user-read-private%20user-library-modify%20user-library-read%20streaming%20user-read-playback-position%20playlist-modify-private%20playlist-read-collaborative%20playlist-read-private%20user-top-read%20playlist-modify-public%20user-read-currently-playing%20user-read-recently-played`

const Login = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
