import React from 'react';

import { Container, Row, Col, Table, Card } from 'react-bootstrap';
import Avatar from 'react-avatar';
import { GoPlay } from "react-icons/go";
import { RiUserFollowFill } from "react-icons/ri";

import './SupplierList.css'

const SupplierList = () => {
  return (
    // <Container className='supplierList_container'>
    //   <h1>SupplierList</h1>
    //   <Table hover>
    //     <thead>
    //       <tr>
    //         <th></th>
    //         <th colSpan={3}>title</th>
    //         <th>Username</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr>
    //         <td>1</td>
    //         <td colSpan={3}>test1</td>
    //         <td>user1</td>
    //       </tr>
    //       <tr>
    //         <td>2</td>
    //         <td colSpan={3}>test2</td>
    //         <td>user1</td>
    //       </tr>
    //       <tr>
    //         <td>3</td>
    //         <td colSpan={3}>test3</td>
    //         <td>user1</td>
    //       </tr>
    //     </tbody>
    //   </Table>
    // </Container>  
    <Container className='supplierList_container'>
      <h1>SupplierList</h1>
      <div className="supplierList-content">
        <div className="supplierList-content_card-container">
          <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> sub<br/>
                <GoPlay />
                viewer
              </Card.Text>
            </Card.Body></Col>
          </Row>
        </div>

        <div className="supplierList-content_card-container">
          <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> sub<br/>
                <GoPlay />
                viewer
              </Card.Text>
            </Card.Body></Col>
          </Row>
        </div>

        <div className="supplierList-content_card-container">
          <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> sub<br/>
                <GoPlay />
                viewer
              </Card.Text>
            </Card.Body></Col>
          </Row>
        </div>
        <div className="supplierList-content_card-container">
          <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> sub<br/>
                <GoPlay />
                viewer
              </Card.Text>
            </Card.Body></Col>
          </Row>
        </div>
        <div className="supplierList-content_card-container">
          <Row>
            <Col><Avatar size="100" round={true}/></Col>
            <Col><Card.Body>
              <Card.Title>creator name</Card.Title>
              <Card.Text>
                <RiUserFollowFill/> sub<br/>
                <GoPlay />
                viewer
              </Card.Text>
            </Card.Body></Col>
          </Row>
        </div>
      </div>

    </Container>
  );
}

export default SupplierList;