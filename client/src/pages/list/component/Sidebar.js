import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Sidebar = () => {
  return (
    <Card>
      <Card.Header as="h5" >LIST</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item action href="/list">광고 목록</ListGroup.Item>
          <ListGroup.Item action href="/list/client">기업 목록</ListGroup.Item>
          <ListGroup.Item action href="/list/supplier">크리에이터 목록</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default Sidebar;