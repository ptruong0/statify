import frogGraphic from './assets/frog.png';
import spotifyLogo from './assets/spotifylogo.png';

import { Jumbotron, Navbar } from 'react-bootstrap';
import './styles.scss';
import axios from 'axios';

const REDIRECT_URI = 'http://localhost:3000';

// const AUTH_URL =
//   `https://accounts.spotify.com/authorize?client_id=89f488fad6fc4e67a2607dba4d955997&response_type=code&redirect_uri=http://ptruong0.github.io/statify/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


const Login = () => {

  const goToOauth = () => {
    axios.get('http://localhost:5000/oauth-credentials')
    .then(res => {
      const CLIENT_ID = res.data.clientId;
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <Navbar expand="lg" className="my-navbar justify-content-between">
        <Navbar.Brand className="nav-text">
          Statify
        </Navbar.Brand>

      </Navbar>
      <div className="login-page">
        <Jumbotron className="landing-jumbotron">
          {/* <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        > */}
          <h1>How do you listen?</h1>
          <h6>Lyrics, stats, and more</h6>
          <a className="btn btn-lg login-btn btn-gradient" onClick={goToOauth}>
            <div className="login-btn-row">
              <p className="btn-text">Login With Spotify
            </p>
            <span className="logo-circle btn-text"><img src={spotifyLogo} className="spotify-logo" alt=""/>
               </span>
            </div>
            
          </a>
          {/* </Container> */}
        </Jumbotron>
        <div className="music-notes">
          <div className="note note1"></div>
          <div className="note note2"></div>
        </div>
        <img src={frogGraphic} alt=""  className="frog-img"/>
        
      </div>
    </div>
  )
}

export default Login;