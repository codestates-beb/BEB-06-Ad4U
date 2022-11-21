import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import './Client.css';

import Profile from '../common/Profile';
import Status from './component/Status';
import { Link } from 'react-router-dom';
import {Accordion, Col, Row, Container} from 'react-bootstrap';

const ClientMypage = ({ userData }) => {
  const { isClient, accessToken } = userData;
  const [myInfo, setMyInfo] = useState({});
  const [adList, setAdlist] = useState([]);

  const navigate = useNavigate();
  //supplier는 접근할 수 없음
  if(isClient === false) navigate('./*');

  useEffect(() => {
    auth.getMypage(isClient, accessToken)
    .then(res => res.data)
    .then(data => {
      setAdlist([data.Advertisements]);
      delete data.Advertisements;
      setMyInfo(data);
    })
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <Container className='clientMypage_container'>
      <Row className='clientMypage_row' >
        <Col xl={3} >
          <Row>
            <Profile userData={userData}/>
            <Link to="/upload"><button className='clientupload_btn'><span>광고 업로드</span></button></Link>
          </Row>
        </Col>
        <Col xl={9}  >
        <Row>
          <h1> Client Mypage</h1>
          <Status />
          <Container className='clientMypage_accordion'>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #1</Accordion.Header>
              <Accordion.Body>

              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #2</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion defaultActiveKey={['0']}>
              <Accordion.Item>
              <Accordion.Header>광고 #3</Accordion.Header>
              <Accordion.Body>
                
              </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
        </Row>
        </Col>       
      </Row>
    </Container>
  );
}

export default ClientMypage;


