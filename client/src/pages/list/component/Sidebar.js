import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

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