import React from 'react';
import { Navbar, OverlayTrigger, Button } from 'react-bootstrap';
import frogLogo from '../assets/frog_logo.png';

const Header = (props) => {
    return (
      <Navbar expand="lg" className="my-navbar justify-content-between">
        
      <Navbar.Brand className="nav-text nav-title">
        <img src={frogLogo} className="frog-logo"/>
          <strong>Statify</strong>
      </Navbar.Brand>
      <div className="nav-right">
          <Navbar.Text className="nav-text">
              Signed in as: {props.username}
          </Navbar.Text>
          <OverlayTrigger placement="bottom" overlay={props.renderTooltip}>
              <Button onClick={props.signOut} variant="outline-info" size="sm" data-rh="tooltip 1">Sign Out</Button>
          </OverlayTrigger>
      </div>
  </Navbar>
    );
}

export default Header;
