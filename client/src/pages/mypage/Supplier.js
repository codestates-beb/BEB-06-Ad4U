import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import { getLocalData } from '../../config/localStrage';
import SupplierAd from './component/SupplierAd';
import ad from '../../hooks/axios/ad';
import supplier from '../../hooks/axios/supplier';
import './Supplier.css';
import Avatar from 'react-avatar';
import Loading from '../../component/Loading';

import Status from './component/Status';
import { Container, Row, Col, Card, ListGroup, Accordion, Button,  OverlayTrigger, Tooltip } from 'react-bootstrap';

const SupplierMypage = () => {
  const accessToken = getLocalData("accessToken");
  const isClient = getLocalData("isClient");
  const [userData, setUserData] = useState({});
  const [adList, setAdlist] = useState([]); 
  const [proposeList, setProposeList] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
          setProposeList(data.Client_has_Suppliers);
          delete data.Client_has_Suppliers;
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
      return filteredAdList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} setIsLoading={setIsLoading} />);
    }
    if (typeof(status) === 'number') {
      const filteredAdList = adList.filter((el) => el.status === status);
      return filteredAdList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} setIsLoading={setIsLoading} />);
    } else return adList.map((adList, idx) => <SupplierAd key={idx} idx={idx} adList={adList} setIsLoading={setIsLoading} />);
  }

  const ListItem = ({ data, idx }) => {
    const { cost, title } = data.Advertisement;
    const adId = data.Advertisement_id;
    const { company_name, profileImgUrl } = data.Client;
    const clientId = data.Client_Id;

    const sendRefuse = async () => {
      try {
        const result = await supplier.refuse(accessToken, isClient, adId);
        if (result) {
          alert("거절완료");
          window.location.reload();
        }
      } catch (err) {
        console.log(err.response.data);
      }
    } 

    return (
      <ListGroup.Item> 
        <Row>
          <Col xl={9}>
            <Row>
              <Col xl={4}>{idx+1}. {title}</Col>
              <Col xl={5}>{cost}ETH</Col>
              <Col xl={3}>{company_name}</Col>
            </Row>
          </Col>
          <Col xl={3}>
            <Button onClick={() => supplier.callApply(accessToken, isClient, adId)}>Accept</Button>
            <Button onClick={sendRefuse}>Refuse</Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
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
                  <ListGroup.Item >
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                      <Tooltip id="button-tooltip">
                        {userData.address}
                      </Tooltip>}
                    >
                    <div>등록된 지갑주소</div>
                    </OverlayTrigger>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </div>
          </div>
        </Col>
        <Col xl={9} >
          {isLoading
          ? <Loading />
          : <Row>
              <h1> Supplier Mypage</h1>
              <Status adList={adList} setStatus={setStatus} />
              <Container className='supplierMypage_accordion'>
                {/* 광고제안 */}
                <Accordion alwaysOpen flush>
                  <Accordion.Item>
                    <Accordion.Header>제안받은 광고</Accordion.Header>
                    <Accordion.Body>
                    <ListGroup variant="flush">
                      {proposeList.length > 0
                      ? proposeList.map((data, idx) => <ListItem key={idx} idx={idx} data={data} />)
                      : <div>제안받은 광고가 없습니다.</div>}
                    </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item> 
                </Accordion>
                <FilterAd adList={adList} status={status} />
              </Container>
            </Row>
          }
        </Col>       
      </Row>
    </Container>
  );
}

export default SupplierMypage;
