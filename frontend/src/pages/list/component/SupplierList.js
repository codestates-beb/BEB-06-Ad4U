import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const SupplierList = () => {
  return (
    <Container>
      <div>SupplierList</div>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th colSpan={3}>title</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td colSpan={3}>test1</td>
            <td>user1</td>
          </tr>
          <tr>
            <td>2</td>
            <td colSpan={3}>test2</td>
            <td>user1</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={3}>test3</td>
            <td>user1</td>
          </tr>
        </tbody>
      </Table>
    </Container>  
  )
}

export default SupplierList;