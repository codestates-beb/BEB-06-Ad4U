import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';
import nullImg from '../../dummyfiles/img1.png';
import { useNavigate } from 'react-router-dom';
import { getLocalData } from '../../config/localStrage'; 

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';
import Avatar from 'react-avatar';
import './Detail.css';

const AdDetail = ({ userData }) => {
  const navigate = useNavigate();
  const { adId } = useParams();
  const [detail, setDetail] = useState({
    Client : {company_name: "", email: ""},
    Advertisement_has_Suppliers: []
  });

  const accessToken = getLocalData('accessToken');
  const isClient = getLocalData('isClient');
  const data = detail.Advertisement_has_Suppliers;
  const isApply = data.filter(data => data.Supplier_id === userData.id);

  console.log("Detail", detail)
  
  useEffect(() => {
    ad.getDetail(adId)
    .then(res=> setDetail(res.data))
    .catch(err => console.log(err.response.data))
  }, [adId])

  return (
    <>
      <Container className='adDetail_container'>
        <Row className='adDetail_row'>

          <Col xl={7} className="adDetail_card">
            <Row className='adDetail_Img'>
              {detail.AdimgUrl 
                ? <Card.Img variant="top" className='adDetail_card_img' src={detail.AdimgUrl}/> 
                : <Card.Img variant='top' className='adDetail_card_img' src={nullImg}/> }
            </Row>
            <Row>
              <h3 className='adTitle'>{detail.title}</h3>
              <br></br>
              <br></br>
              <p className='adContent'>{detail.content}</p>
            </Row>
          </Col>

          <Col xl={3}>
            <Card border="dark"
              bg={"dark"}
              text={"white"} 
              className="adDetail_info_card"
            >
              <Card.Header 
              as="h5"
              onClick={() => navigate(`/detail/client/${detail.Client.id}`)}
              key={detail.Client.id}
              >
                {detail.profileImgUrl
                  ? <Avatar className='avatar' src={detail.profileImgUrl} size="50"/>
                  : <Avatar className='avatar' src={nullImg} size="50"/>
                }
                {detail.Client.company_name}
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush" className='item'>
                  <ListGroup.Item>{detail.Client.email}</ListGroup.Item>
                  <ListGroup.Item>{detail.Client.company_number}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Body>
                <Card.Title className='infoCardTitle'>제안 금액</Card.Title>
                <Card.Text>
                  {detail.cost} ETH
                </Card.Text>
                <Card.Title className='infoCardTitle'>지원자 수</Card.Title>
                <Card.Text>
                  {detail.Advertisement_has_Suppliers.length}
                </Card.Text>
                <div className='adGo'>
                  {isApply.length 
                    ? (<button className='adGo_btn' onClick={() => ad.callApplyCancel(accessToken, isClient, adId)} ><span>취소하기</span></button>)
                    : (<button className='adGo_btn' onClick={() => ad.callApply(accessToken, isClient, adId)} ><span>지원하기</span></button>)
                  } 
                </div>
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      </Container>
    </>
  );
}

export default AdDetail;