import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = () => {
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Row>
          <Col>
            <Navbar.Brand>List</Navbar.Brand>
          </Col>    
          <Col>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </Col>  
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Row>
                <Nav.Link href="/list">광고 목록</Nav.Link>
                <Nav.Link href="/list/client">기업 목록</Nav.Link>
                <Nav.Link href="/list/supplier">크리에이터 목록</Nav.Link>
                {/* dropdown */}
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Row>
            </Nav>
          </Navbar.Collapse>
        </Row>
      </Container>
    </Navbar>
  )
}

export default Sidebar;



// <div>
// <div>Sidebar</div>
// <Link to="/list">AD List</Link>
// <Link to="/list/client">Client List</Link>
// <Link to="/list/supplier">Creater List</Link>
// </div>