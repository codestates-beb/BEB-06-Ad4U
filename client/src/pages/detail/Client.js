import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ad from '../../hooks/axios/ad';
import client from '../../hooks/axios/client';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';

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
          <Card.Title className='clientDetail_title' as='h1'>{detail.company_name}</Card.Title>
          <ListGroup variant="flush">
            <Card.Text>{detail.email}</Card.Text>
            <Card.Text>{detail.company_number}</Card.Text>
            <ListGroup.Item></ListGroup.Item>
            <Card.Text as='h4' className='clientDetail_text'>모집중인 광고</Card.Text>
            <div className="clientDetail-content">
              {advertisement.length === 0 
              ? <div className='noad'>현재 모집중인 광고가 없습니다.</div>
              : advertisement.map((el, idx) => {
                console.log(el)
                return (
                  
                  <div 
                  className="clientDetail-content_card-container"
                  onClick={() => navigate(`/detail/ad/${el.id}`)}
                  key={idx}
                  >
                    {/* <div key={idx}> */}
                      {/* <span>광고 # {idx+1}</span> */}
                    <h5>{el.title}</h5>
                    {/* </div> */}
                  </div>
              )})}
            </div>
          </ListGroup>
        </Card.Body>
       </div>
    </Container> 
  );
}

export default ClientDetail;


