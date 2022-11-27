import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';
import client from '../../hooks/axios/client';
import { useNavigate } from 'react-router-dom';

import Avatar from 'react-avatar';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';

import nullImg from '../../dummyfiles/img1.png';
import './Detail.css';

const ClientDetail = () => {
  const { clientId } = useParams();
  const [detail, setDetail] = useState({ company_name: "", company_number: "", email: "" });
  const [advertisement, setAdvertisement] = useState([]);
  console.log("Detail", detail)
  console.log("Advertisement", advertisement)

  useEffect(() => {
    client.getDetail(clientId)
    .then(res => {
      setDetail(res.data)
      return ad.getList()
      .then(res => res.data)
      .then(data => {
        let advertisements = [];
        data.forEach(el => {
          if(String(el.Client.id) === clientId) return advertisements.push(el);
        });
        setAdvertisement(advertisements);
      })
    })
    .catch(err => err.response.data)
  }, [clientId])

  const navigate = useNavigate();
  
  return (
    <Container className='clientDetail_container'>
      <div className="clientDetail_card-container">
        <Card.Body>
          <Card.Title className='clientDetail_title' as='h1'>
            {detail.profileImgUrl
              ? <Avatar className='avatar' src={detail.profileImgUrl} size="100"/>
              : <Avatar className='avatar' src={nullImg} size="100"/>
            }
            {detail.company_name}
          </Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item></ListGroup.Item>
            <Card.Text as='h4' className='clientDetail_text'>모집중인 광고</Card.Text>
            <div className="clientDetail-content">
              {advertisement.length === 0 
              ? <div>현재 모집중인 광고가 없습니다.</div>
              : advertisement.map((el, idx) => {
                console.log(el)
                return (
                  <div 
                  className="clientDetail-content_card-container"
                  onClick={() => navigate(`/detail/ad/${el.id}`)}
                  key={idx}
                  >
                    <h5>{el.title}</h5>
                  </div>
              )})}
            </div>
            <ListGroup.Item></ListGroup.Item>
            <Card.Text as='h4' className='clientDetail_text'>회사소개</Card.Text>
            <Card.Text>{detail.intro}</Card.Text>
            <Card.Text>문의 _ 회사 이메일 : {detail.email}</Card.Text>
            <Card.Text>사업자번호 : {detail.company_number}</Card.Text>
          </ListGroup>
        </Card.Body>
       </div>
    </Container> 
  );
}

export default ClientDetail;


