import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Avatar from 'react-avatar';

import ad from '../../../hooks/axios/ad'
import nullImg from '../../../dummyfiles/img1.png';

import { Container } from 'react-bootstrap';

import '../Main.css';

const Ad = () => {
  const [list, setList] = useState([]);

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
            <div className='ad_card'
              onClick = {() => {
                navigate(`/detail/ad/${data.id}`)
                window.scrollTo(0,0)
              }}
              key={idx}
            >
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
                <div className='ad_back_cost'>제안 금액 : {data.cost}ETH</div>
                <div className='ad_back_email'>문의 : {data.Client.email}</div>
              </div>
            </div>
        )})}
      </div>
      <div className='viewall'>
        <Link to="/list"><button className='viewall_btn'><span>View all</span></button></Link>
      </div>
    </Container>
  );
}

export default Ad;