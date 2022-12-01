import React from 'react';
import { Route, Routes } from 'react-router';

import AdList from './component/AdList';
import ClientList from './component/ClientList';
import SupplierList from './component/SupplierList';
import Emptypage from '../../component/Emptypage';
import Container from 'react-bootstrap/esm/Container';
import { Card, ListGroup, Row, Col } from 'react-bootstrap';
import './ListPage.css';

const List = () => {
  return (
    <Container className='list_container'>
      <Row>
        <Col xl={3} className="list_card">
          <Card style={{ width: '250px' }}>
            <Card.Header as="h5">LIST</Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className='item'>
                <ListGroup.Item action href="/list">광고 목록</ListGroup.Item>
                <ListGroup.Item action href="/list/client">기업 목록</ListGroup.Item>
                <ListGroup.Item action href="/list/supplier">크리에이터 목록</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          
        </Col>
        <Col xl={9} >
          <Routes>
            <Route path="/" element={<AdList />} />
            <Route path="/client" element={<ClientList />} />
            <Route path="/supplier" element={<SupplierList />} />
            <Route path="*" element={<Emptypage />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
export default List;