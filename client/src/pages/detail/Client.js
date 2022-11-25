import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../../hooks/axios/client';
import { useNavigate } from 'react-router-dom';

import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap/esm';

import './Detail.css';

const ClientDetail = () => {
  const { clientId } = useParams();
  const [detail, setDetail] = useState({ company_name: "", company_number: "", email: "", Advertisements:[] });
  console.log("Detail", detail)

  useEffect(() => {
    client.getDetail(clientId)
    .then(res=> setDetail(res.data))
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
            <Card.Text as='h4' className='clientDetail_text'>진행중인 광고</Card.Text>
            <div className="clientDetail-content">              
              {detail && detail.Advertisements.map((el, idx) => {
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