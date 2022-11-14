import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Logo from './Logo.png';

const Nav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to="/">
          <img 
          alt = "Ad4U logo" src = {Logo} className="nav_logo"/>
        </Link>

      </Container>
    </Navbar>
   

    
  )
}

export default Nav;
