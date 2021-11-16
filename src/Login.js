import './styles.scss';
import { fetchOauthClientId } from './functions/backendCalls';
import { showError } from './functions/helperFunctions';
import frogGraphic from './assets/frog.png';
import spotifyLogo from './assets/spotifylogo.png';

import { Jumbotron, Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  return (
    <div>
      
      {/* simple navbar */}
      <Navbar expand="lg" className="my-navbar justify-content-between">
        <Navbar.Brand className="nav-text">
          Statify
        </Navbar.Brand>
      </Navbar>

      <div className="login-page">

        {/* short blurb and "start" button */}
        <Jumbotron className="landing-jumbotron">

          <h1>How do you listen?</h1>
          <h6>Lyrics, stats, and more</h6>
          <a className="btn btn-lg login-btn btn-gradient" onClick={() => fetchOauthClientId(showError)}>
            <div className="login-btn-row">
              <p className="btn-text">Login With Spotify
              </p>
              <span className="logo-circle btn-text"><img src={spotifyLogo} className="spotify-logo" alt="" />
              </span>
            </div>

          </a>
        </Jumbotron>

        {/* frog and music note graphics on the right side */}
        <div className="graphic">
          <div className="music-notes">
            <div className="note note1"></div>
            <div className="note note2"></div>
          </div>
          <img src={frogGraphic} alt="" className="frog-img" />
        </div>

        {/* container for toast error messages */}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

      </div>
    </div>
  )
}

export default Login;