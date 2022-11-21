import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import ClientAd from './component/ClientAd';
import './Client.css';

import Profile from '../common/Profile';
import Status from './component/Status';
import { Link } from 'react-router-dom';
import {Accordion, Col, Row, Container} from 'react-bootstrap';
import ClientAdBar from './component/ClientAd';

const ClientMypage = ({ userData }) => {
  const { isClient, accessToken } = userData;
  const [myInfo, setMyInfo] = useState({});
  const [adList, setAdlist] = useState([]);
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();
  //supplier는 접근할 수 없음
  if(isClient === false) navigate('./*');

  useEffect(() => {
      auth.getMypage(isClient, accessToken)
      .then(res => res.data)
      .then(data => {
          setAdlist(data.Advertisements);
          delete data.Advertisements;
          setMyInfo(data);
      })
      .catch(err => console.log(err.response.data))
  }, []);

  const FilterAd = ({ adList, status }) => {
    //status가 초기값(0)인경우 필터링 하지않음
    if (status > 0) {
      const filteredAdList = adList.filter((el) => el.status === status);
      return filteredAdList.map((el, idx) => <ClientAd key={idx} adList={filteredAdList} />);
    } else return adList.map((el, idx) => <ClientAd key={idx} adList={adList} />);
  }

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
          <Status adList={adList} setStatus={setStatus} />
          <Container className='clientMypage_accordion'>
            <FilterAd adList={adList} status={status}/>
          </Container>
        </Row>
        </Col>       
      </Row>
    </Container>
  );
}

export default ClientMypage;


