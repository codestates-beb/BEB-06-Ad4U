import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SBT.css';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import nullImg from '../../../../dummyfiles/img1.png';



const SBTView = ({ userData, adList }) => {
  const [list, setList] = useState([]);
  const [sbtList, setSbtList] = useState([]);
  
  // loading overlay
  const [loaded, setLoaded] = useState(false);
  console.log(adList)

  const navigate = useNavigate();

  useEffect(() => {
    setSbtList(adList.filter(element => {
        return element.status > 2;
    }));
    console.log(sbtList)
  }, [adList])

  

  return (
    <Container className='sbtContainer'>
      <h3 className='sbtTitle'>나의 등록된 계약서 확인</h3>
      <div className="sbt-content">
        {sbtList.map((data, idx) => { return (
                <div 
                className="ad-content_card-container"
                onClick = {() => {

                }}
                key={idx}
                >
                {data.AdimgUrl 
                ? <Card.Img variant="top" src={data.AdimgUrl}/> 
                : <Card.Img variant='top' src={nullImg}/> }
                <Card.Body>
                    <Card.Title>{data.title}</Card.Title>
                    <Card.Text>
                    {data.createdAt}
                    </Card.Text>
                </Card.Body>
                </div>
            )})}
        </div>
    </Container>
  );
}

export default SBTView;