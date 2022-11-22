import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';
import nullImg from '../../component/null.png';
import { useNavigate } from 'react-router-dom';
import apply from '../../hooks/axios/function';

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';

import './Detail.css';

const AdDetail = () => {
  const navigate = useNavigate();
  const { adId } = useParams();
  const [detail, setDetail] = useState({
    Client : {company_name: "", email: ""}
  });
  console.log("Detail", detail)
  console.log(detail.Client)
  
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
            <Card.Header 
            as="h5"
            onClick={() => navigate(`/detail/client/${detail.Client.id}`)}
            key={detail.Client.id}
            >{detail.Client.company_name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush" className='item'>
                <ListGroup.Item>{detail.Client.email}</ListGroup.Item>
                <ListGroup.Item>{detail.Client.company_number}</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          <div className='adGo'>
            <button className='adGo_btn' onClick={apply} ><span>지원하기</span></button>
          </div>
        </Col>
        <Col xl={9} className="adDetail_card">
          <Row className='adDetail_Img'>
            {detail.AdimgUrl 
              ? <Card.Img variant="top" className='adDetail_card_img' src={detail.AdimgUrl}/> 
              : <Card.Img variant='top' className='adDetail_card_img' src={nullImg}/> }
          </Row>
          <Row>
            <Card style={{ width: '900px' }}>
              <Card.Header as="h3">{detail.title}</Card.Header>
              <Card.Body>{detail.content}</Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
      </Container>
    </>
  );
}

export default AdDetail;