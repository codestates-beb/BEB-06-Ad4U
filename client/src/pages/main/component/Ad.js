import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import ad from '../../../hooks/axios/ad'
import nullImg from '../../../dummyfiles/img1.png';
import Avatar from 'react-avatar';

const Ad = ({ data }) => {
  const [list, setList] = useState([]);
  console.log(list)

  const navigate = useNavigate();

  useEffect(() => {
    ad.mainList()
    .then(res => setList(res.data))
    .catch(err => console.log(err.response.data))
  }, [])

  return (
    <Container className='ad_container'>
      <h1>Advertising Inventory</h1>
      <h3>광고를 찾고계신가요?</h3>
      <div className="ad-content">
        {list.map((data, idx) => { 
          return (
              <div className='ad_card'>
                <div className='ad_card_front'>
                  {data.AdimgUrl 
                    ? <img src={data.AdimgUrl} alt='adimg'/> 
                    : <img src={nullImg} alt='nullimg'/> }
                    <div className='ad_card_front_title'>
                      <div>{data.title}</div>
                      <div className='ad_card_name'>{data.Client.company_name}</div>
                    </div>
            
                </div>
                <div className='ad_card_back'>
                  <Avatar src={data.Client.profileImgUrl} size="100" />
                  <div className='ad_back_cost'>광고료 : {data.cost}ETH</div>
                  <div className='ad_back_email'>문의 : {data.Client.email}</div>
                </div>
              </div>
        )})}
      </div>
      <div className='ad_viewall'>
        <Link to="/list"><button className='adviewall_btn'><span>View all</span></button></Link>
      </div>
    </Container>
  );
}

export default Ad;