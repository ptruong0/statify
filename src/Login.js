import { Container, Jumbotron } from 'react-bootstrap';
import './styles.scss';

const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=89f488fad6fc4e67a2607dba4d955997&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

const Login = () => {
  return (
    <div className="login-page">
      <Jumbotron className="landing-jumbotron">
        {/* <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        > */}
        <h1>How do you listen?</h1>
        <h6>Lyrics, stats, and more</h6>
          <a className="btn btn-lg login-btn" href={AUTH_URL}>
            Login With Spotify
          </a>
        {/* </Container> */}
      </Jumbotron>
    </div>
  )
}

export default Login;