import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';
import nullImg from './component/Logo.png';

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';

import './Detail.css';

const AdDetail = () => {
  const { adId } = useParams();
  const [detail, setDetail] = useState({
    Client : {company_name: "", email: ""}
  });
  console.log("Detail", detail)
  
  useEffect(() => {
    ad.getDetail(adId)
    .then(res=> setDetail(res.data))
    .catch(err => err.response.data)
  }, [])

  return (
    <>
      <Container className='adDetail_container'>
      <Row>
        <Col xl={3} className="adDetail_company_card">
          <Card style={{ width: '259px' }}>
            {/* detail.Client가 null일때 detail.Client.company_name를 불러오려고 하면 오류남 */}
            <Card.Header as="h5">{detail.Client.company_name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className='item'>
                <ListGroup.Item>{detail.Client.email}</ListGroup.Item>
                <ListGroup.Item>{detail.Client.company_number}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <div className='adGo'>
            <Link to="/list"><button className='adGo_btn'><span>지원하기</span></button></Link>
          </div>
        </Col>
        <Col xl={9} className="adDetail_card">
          <Card style={{ width: '900px' }}>
            {detail.AdimgUrl ? <Card.Img variant="top" src={detail.AdimgUrl}/> : <Card.Img variant='top' src={nullImg}/> }
          <h3>{detail.title}</h3>
          <div>내용 {detail.content}</div>
          </Card>
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default AdDetail;