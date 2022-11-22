import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main.css';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import ad from '../../../hooks/axios/ad'
import nullImg from '../../../component/null.png';

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
    <div className='ad_container'>
      <h2>최신 광고</h2>
      <div className="ad-content">
        {list.map((data, idx) => { return (
            <div 
            className="ad-content_card-container"
            onClick = {() => {
              navigate(`/detail/ad/${data.id}`)
              window.scrollTo(0,0)
            }}
            key={idx}
            >
              {data.AdimgUrl 
              ? <Card.Img variant="top" src={data.AdimgUrl}/> 
              : <Card.Img variant='top' src={nullImg}/> }
              <Card.Body>
                <Card.Title>{data.title}</Card.Title>
                <Card.Text>{}</Card.Text>
                <Card.Text>
                  {data.createdAt}
                </Card.Text>
              </Card.Body>
            </div>
        )})}
      </div>
      <div className='ad_viewall'>
        <Link to="/list"><button className='adviewall_btn'><span>View all</span></button></Link>
       </div>
    </div>
  );
}

export default Ad;