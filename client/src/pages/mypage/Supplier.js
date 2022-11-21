import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import { getLocalData } from '../../config/localStrage';
import SupplierAd from './component/SupplierAd';
import './Supplier.css';

import Profile from '../common/Profile';
import Status from './component/Status';
import { Container, Accordion, Row, Col } from 'react-bootstrap';

const SupplierMypage = ({ userData }) => {
  const accessToken = getLocalData("accessToken");
  const isClient = getLocalData("isClient");
  const [myInfo, setMyInfo] = useState({});
  const [adList, setAdlist] = useState([]);
  const [status, setStatus] = useState(0);

  const navigate = useNavigate();

  const dummy = [{id: 0, status: 0},{id: 1, status: 1},{id: 2, status: 2},{id: 3, status: 3}];

  useEffect(() => {
    if(accessToken && isClient === "false") {
      auth.getMypage(isClient, accessToken)
      .then(res => res.data)
      .then(data => {
          setAdlist(data.Advertisement_has_Suppliers);
          // setAdlist(dummy);
          delete data.Advertisement_has_Suppliers;
          setMyInfo(data);
      })
      .catch(err => console.log(err.response.data))
    } else return navigate('*');
  }, []);

  const FilterAd = ({ adList, status }) => {
    //status가 초기값(0)인경우 필터링 하지않음
    if (status > 0) {
      const filteredAdList = adList.filter((el) => el.status === status);
      return filteredAdList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} />);
    } else return adList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} />);
  }

  return (
    <Container className='supplierMypage_container'>
      <Row className='supplierMypage_row' >
        <Col xl={3} >
          <Profile userData={userData}/>
        </Col>
        <Col xl={9} >
        <Row>
          <h1> Supplier Mypage</h1>
          <Status adList={adList} setStatus={setStatus} />
          <Container className='supplierMypage_accordion'>
           <FilterAd adList={adList} status={status} />
          </Container>
        </Row>
        </Col>       
      </Row>
    </Container>
  );
}

export default SupplierMypage;
