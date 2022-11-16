import React from 'react';
import { Route, Routes } from 'react-router';

import AdList from './component/AdList';
import ClientList from './component/ClientList';
import SupplierList from './component/SupplierList';
import Emptypage from '../../component/Emptypage';
import Sidebar from './component/Sidebar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const List = () => {
  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Sidebar />
        </Col>
        <Col xs={10}>
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