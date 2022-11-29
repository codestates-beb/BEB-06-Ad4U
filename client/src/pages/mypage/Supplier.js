import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import { getLocalData } from '../../config/localStrage';
import SupplierAd from './component/SupplierAd';
import './Supplier.css';
import Avatar from 'react-avatar';

import Status from './component/Status';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

const SupplierMypage = () => {
  const accessToken = getLocalData("accessToken");
  const isClient = getLocalData("isClient");
  const [userData, setUserData] = useState({});
  const [adList, setAdlist] = useState([]);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  // console.log("adList", adList)

  useEffect(() => {
    if(accessToken && isClient === "false") {
      auth.getMypage(isClient, accessToken)
      .then(res => res.data)
      .then(data => {
          let list = [];
          data.Advertisement_has_Suppliers.forEach((el) => {
            const { Advertisement, Advertisement_id, Supplier_id } = el;
            Advertisement.Advertisement_id = Advertisement_id;
            Advertisement.Supplier_id = Supplier_id;
            list.push(Advertisement);
          });
          setAdlist(list);
          delete data.Advertisement_has_Suppliers;
          setUserData(data);
      })
      .catch(err => console.log(err.response.data))
    } else return navigate('*');
  }, [accessToken, isClient]);

  const FilterAd = ({ adList, status }) => {
    //status가 초기값("")인경우 필터링 하지않음
    if (status === 2) { //2일때는 2, 3 모두 보이게
      const filteredAdList = adList.filter((el) => el.status === 2 || el.status === 3);
      return filteredAdList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} />);
    }
    if (typeof(status) === 'number') {
      const filteredAdList = adList.filter((el) => el.status === status);
      return filteredAdList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} />);
    } else return adList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} />);
  }
  
  return (
    <Container className='supplierMypage_container'>
      <Row className='supplierMypage_row' >
        <Col xl={3} >
          <div className="profile-content">
            <div className="profile-content_card-container">
              <Avatar src={userData.profileImgUrl} size="100" round={true}/>
              <Card.Body>
                <Card.Title className='mt-3'>{userData.channelName}</Card.Title>
                <ListGroup variant="flush" className='mt-3'>
                <ListGroup.Item >{userData.email}</ListGroup.Item>
                <ListGroup.Item >{userData.userId}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </div>
          </div>
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
