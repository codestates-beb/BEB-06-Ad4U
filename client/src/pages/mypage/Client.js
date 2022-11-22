import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../hooks/axios/auth';
import { getLocalData } from '../../config/localStrage';
import ClientAd from './component/ClientAd';
import './Client.css';
import Avatar from 'react-avatar';
import img from '../../dummyfiles/img1.png';
import Status from './component/Status';
import { Link } from 'react-router-dom';
import { Col, Row, Container, Spinner, Card, ListGroup} from 'react-bootstrap';
import axios from 'axios';

const ClientMypage = ({ userData }) => {
  const accessToken = getLocalData("accessToken");
  const isClient = getLocalData("isClient");
  const [myInfo, setMyInfo] = useState({});
  const [adList, setAdlist] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if(accessToken && isClient === "true") {
      auth.getMypage(isClient, accessToken)
      .then(res => res.data)
      .then(data => {
          setAdlist(data.Advertisements);
          delete data.Advertisements;
          setMyInfo(data);
      })
      .catch(err => console.log(err.response.data))
    } else return navigate('*');
  }, []);

  const FilterAd = ({ adList, status }) => {
    //status가 초기값("")인경우 필터링 하지않음
    if (typeof(status) === 'number') {
      const filteredAdList = adList.filter((el) => el.status === status);
      return filteredAdList.map((adList, idx) => <ClientAd key={idx} idx={idx} adList={adList} />);
    } else return adList.map((adList, idx) => <ClientAd key={idx} idx={idx} adList={adList} />);
  }

  // const handleLoading = () => {
  //   setIsLoading(true);
  //   axios.post("")
  //   .then(() => )
  //   .then(() => {setIsLoading(false)
  //   }
  //   .catch(() => {
  //     console.log(err)
  //     setIsLoading(false);
  //   }))
  // }
  console.log(userData)
  return (
    <Container className='clientMypage_container'>
      <Row className='clientMypage_row' >
        <Col xl={3} >
          <Row>
            <div className="profile-content">
              <div className="profile-content_card-container">
                <Avatar src={img} size="100" round={true}/>
                <Card.Body>
                  <Card.Title className='mt-3'>{userData.company_name}</Card.Title>
                  <ListGroup variant="flush" className='mt-3'>
                  <ListGroup.Item >{userData.email}</ListGroup.Item>
                  <ListGroup.Item >{userData.company_number}</ListGroup.Item>
                  <ListGroup.Item >{userData.userId}</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </div>
            </div>
            <Link to="/upload"><button className='clientupload_btn'><span>광고 업로드</span></button></Link>
          </Row>
        </Col>
        <Col xl={9}  >
        <Row>
          <h1> Client Mypage</h1>
          <Status adList={adList} setStatus={setStatus} />
          <Container className='clientMypage_accordion'>
            <FilterAd adList={adList} status={status} />
          </Container>
        </Row>
        </Col>       
      </Row>
    </Container>
  );
}

export default ClientMypage;


